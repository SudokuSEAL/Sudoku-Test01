// React
import React, { useEffect, useState } from 'react';
// React Router
import { NavLink } from "react-router-dom";
// Amplify
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import awsExports from "./aws-exports";
// Queries and Mutations
import { deleteStudent } from './graphql/mutations';
import { deleteProjectMember } from './customgraphql/custommutations';
import { searchStudents } from './customgraphql/customqueries';
import { searchStudentsMajor } from './customgraphql/customqueries';
import { getProject } from './customgraphql/customqueries';

// Frontend
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

import { Multiselect } from 'multiselect-react-dropdown';
import { listEnumValues } from './customgraphql/customqueries';
import { listProjects } from './graphql/queries';
import sortBy from 'lodash/sortBy';

Amplify.configure(awsExports);

const initialState = { search: '' }
const element = <FontAwesomeIcon icon={faTimesCircle} size="lg" />

var clear = false; //used to determine if search bar needs to be be cleared or not
var majorFilterSelected = []; //holds the selected majors for the Major Filter
var projectFilterSelected = []; //holds the selected projects for the Project Filter

const Students = () => {
  const [formState, setFormState] = useState(initialState)
  const [students, setStudents] = useState([])
  const [majors, setMajors] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchStudents()
    fetchMajors()
    fetchProjects()
  })

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  //Fetches majors to be displayed in the Major Filter
  async function fetchMajors() {
    try {
      const majorData = await API.graphql(graphqlOperation(listEnumValues, { enum: "Major" }));
      const majors = majorData.data.enum.enumValues;
      setMajors(majors);
    } catch (err) { console.log('error fetching majors', err) }
  }

  //Queried majors added as options in the Major Filter Dropdown
  const majorFilterState = {
    majorOptions: []
  };
  for (let i = 0; i < majors.length; i++) {
    majorFilterState.majorOptions[i + 1] = { name: majors[i].name, id: majors[i].index + 1 };
  }

  //Fetches projects to be displayed in the Project Filter
  async function fetchProjects() {
    try {
      const projectData = await API.graphql(graphqlOperation(listProjects));
      const projects = projectData.data.listProjects.items;
      setProjects(projects);
    } catch (err) { console.log('error fetching results', err) }
  }

  //Queried projects added as options in the Project Filter Dropdown
  const projectFilterState = {
    projectOptions: []
  };
  for (let i = 0; i < projects.length; i++) {
    projectFilterState.projectOptions[i + 1] = { name: projects[i].name, id: projects[i].id };
  }
  
  async function fetchStudents() {
    try {
      //Searches for students using input value provided in search bar
      const searchval = { ...formState }
      if (clear === true) {
        clear = false;
        searchval.search = '';
      }
      const studentData = await API.graphql(graphqlOperation(searchStudents, { input: searchval.search.toLowerCase() }));
      var students = studentData.data.listStudents.items;
      
      //Filters by Major
      if (majorFilterSelected.length > 0) {
        var studentsTemp = [];
        for(let i = 0; i < majorFilterSelected.length; i++) {
          const tempData = await API.graphql(graphqlOperation(searchStudentsMajor, { input: searchval.search.toLowerCase(), major: majorFilterSelected[i].name }));
          students = [...tempData.data.listStudents.items]; // do not need ... operator and [ ] brackets (i think)
          studentsTemp = studentsTemp.concat(students);
        }
        students = studentsTemp;
      }
    
      //Filters by Project
      if (projectFilterSelected.length > 0) {
        var membersTemp = [];
        for(let i = 0; i < projectFilterSelected.length; i++){
          const projectData = await API.graphql(graphqlOperation((getProject), { id: projectFilterSelected[i].id }));
          var members = projectData.data.getProject.members.items;
          console.log(members);
          membersTemp = membersTemp.concat(members);
          console.log(membersTemp);
        }
        membersTemp = membersTemp.map(member => member.studentId);
   
        //compares students and project members and only selects the students 
        //that are also project members
        var bothStudentAndMember = [];
        for(let i = 0; i < students.length; i++){
          if(membersTemp.includes(students[i].id)){
            bothStudentAndMember.push(students[i]);
          }
        }
        students = bothStudentAndMember;
      }
      
      //A message is displayed to the user if there are no students in the database
      if (students.length === 0 && searchval.search === '' && majorFilterSelected.length === 0 && projectFilterSelected.length === 0) {
        document.getElementById("removebut").innerHTML = "There are no students. Add students to view them.";
        document.getElementById("removebut").style.backgroundColor = "green";
        document.getElementById("removebut").style.display = "block";
      } 
      
      //A message is displayed to the user if there are no students in the database 
      //that match their inputted search value and/or the selected filter options
      else if (students.length === 0) { 
        document.getElementById("removebut").innerHTML = "There are no student results with that search value.";
        document.getElementById("removebut").style.backgroundColor = "red";
        document.getElementById("removebut").style.display = "block";
      } else {
        try {
          document.getElementById("removebut").style.display = "none";
        } catch (err) {
          console.log("removebut doesnt exist");
        }
      }
      
      // Sorting all students by their names (from A-Z); Capital letters > small letters (V > t)
      students = sortBy(students, 'searchString');
      setStudents(students);
      for (let i = 0; i < students.length; i++) {
        if (document.getElementById("pic-" + students[i].id) != null) {
          if (students[i].photoURL) {
            Storage.get(students[i].photoURL).then (result => {
              console.log(result)
              document.getElementById("pic-" + students[i].id).src=result
            })
          } else {
            document.getElementById("pic-" + students[i].id).classList.add("hidden")
          }
        }
      }
    } catch (err) { console.log('error fetching results', err) }
  }

  async function removeStudent(student) {
    try {
      if (students.length === 0) return;
      student.projects.items.forEach(async (item) => (
        await API.graphql(graphqlOperation(deleteProjectMember, { input: { id: item.id } }))
      ))
      await API.graphql(graphqlOperation(deleteStudent, { input: { id: student.id } }));
      fetchStudents();
    }
    catch (err) { console.log('error deleting student', err) }
  }

  //Called when the user types or deletes something in the search bar
  //Searches for students matching whatever new value is in the search bar
  function handleChange(event) {
    setFormState({ value: event.target.value });
    setInput('search', event.target.value);
    fetchStudents();
  }

  
  //Called when button next to search bar is clicked
  //Clears input values in search bar
  async function clearResults() {
    setFormState({ value: '' });
    setInput('search', '');
    clear = true;
    fetchStudents();
  }

  //Called when there is a change in the Major Filter
  async function onMajorFilterChange(selectedList){
    majorFilterSelected = selectedList;
    fetchStudents();
  }

  //Called when there is a change in the Projects Filter
  async function onProjectFilterChange(selectedList){
    projectFilterSelected = selectedList;
    fetchStudents();
  }

  return (
    <div style={styles.container}>
      <h2>Student Dashboard</h2>
      <NavLink to="/AddStudentPage">
        <button style={styles.button}>Add Student</button>
      </NavLink>
      <div>
        <input
          id="form"
          onInput={handleChange}
          onKeyUp={handleChange}
          style={styles.input}
          value={formState.search}
          placeholder="Search"
          autoComplete="off"
        />
        <button style={styles.img} onClick={clearResults}>{element}</button>
        <Multiselect
          autoComplete="off"
          options={majorFilterState.majorOptions} // Options to display in the Major Filter dropdown
          selectedValues={majorFilterState.selectedValue} // Preselected value to persist in dropdown
          showCheckbox={true}
          placeholder="Filter by Major"
          closeIcon="cancel"
          style={styles.filter}
          onSelect={onMajorFilterChange} // Function will trigger on select event
          onRemove={onMajorFilterChange} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />
        {<Multiselect
          options={projectFilterState.projectOptions} // Options to display in the Project Filter dropdown
          selectedValues={projectFilterState.selectedValue} // Preselected value to persist in dropdown
          showCheckbox={true}
          placeholder="Filter by Project"
          closeIcon="cancel"
          style={styles.filter}
          onSelect={onProjectFilterChange} // Function will trigger on select event
          onRemove={onProjectFilterChange} // Function will trigger on remove event
          displayValue="name" // Property name to display in the dropdown options
        />}

      </div>
      <h3 style={styles.alert} id="removebut"> </h3>
      {
        students.map((student, index) => (
          <div key={student.id ? student.id : index} style={styles.student}>
            <a href={"/students/" + student.id} style={styles.link}><p style={styles.studentName}>{student.name}</p></a>
            <img src="" style={{maxWidth: 150}} id={"pic-" + student.id} alt=""/>
            <p style={styles.studentField}>{student.nickname}</p>
            <p style={styles.studentField}>{student.phonenumber}</p>
            <p style={styles.studentField}>{student.email}</p>
            <p style={styles.studentField}>{student.major}</p>
            <button style={styles.removeButton} onClick={() => removeStudent(student)}>Remove Student</button>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  student: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 0, padding: 8, fontSize: 18, marginTop: 10 },
  studentName: { fontSize: 20, fontWeight: 'bold' },
  studentField: { marginBottom: 0 },
  link: { textDecoration: 'none', color: 'black' },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  removeButton: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px', marginTop: 10 },
  filter: { multiselectContainer: { width: 240 }, optionContainer: { backgroundColor: 'orange' }, searchBox: { border: "none", "borderBottom": "2px solid orange", "borderRadius": "0px" } },
  alert: { backgroundColor: 'red', color: 'white' },
  img: { paddingLeft: 10 }
}

export default Students;
