import React, { useEffect, useState } from 'react';
import {
    useParams
} from 'react-router-dom';
import { getProject, listStudentIdsNames } from './customgraphql/customqueries';
import { createProjectMember, updateProject } from './graphql/mutations';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { student: '', membership: '' }

const AddProjectMemberRolePage = () => {
  let { projectId } = useParams();

  const [project, setProject] = useState(null);
  const [students, setStudents] = useState([]); // Used to make sure only valid student ids are added
  const [formState, setFormState] = useState(initialState);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    fetchProject();
    fetchStudents();
  })

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchProject() {
    try {
      const projectData = await API.graphql(graphqlOperation((getProject), { id: projectId }));
      setProject(projectData.data.getProject);
      if (project === null) setValid(false);
    } catch (err) {
      console.log('error fetching project', err);
    }
  }

  // Get studentIds so that user does not add invalid student ids
  async function fetchStudents() {
    try {
      const studentData = await API.graphql(graphqlOperation(listStudentIdsNames));
      const students = studentData.data.listStudents.items;
      setStudents(students);
    } catch (err) { console.log('error fetching students', err) }
  }

  async function addMember() {
    try {
      // Check that from is not empty
      if (!formState.student) {
        alert("Please select a student to add to the project " + project.name);
        return;
      }

      const tempStudentData = formState.student.split(", ");
      const studentName = tempStudentData[0];
      const studentId = tempStudentData[1];

      if (studentNotFound(studentId)) {
        alert(studentName + " does not exist");
        return;
      } else if (alreadyInProject(studentId)) {
        alert(studentName + " is already a member of " + project.name);
        return;
      }
      
      // If we don't have this role, add it to the project
      if (project.roles.indexOf(formState.membership) === -1) {
        project.roles.push(formState.membership);
        const {members, createdAt, updatedAt, ...tempProject} = {...project};
        await API.graphql(graphqlOperation((updateProject), { input: tempProject }));
      }

      await API.graphql(graphqlOperation(createProjectMember,  {
        input: { studentId: studentId, projectId: projectId, membership: formState.membership }
      }));

      window.location.href='/projects/' + projectId;
    } catch (err) {
      console.log('error adding member:', err)
    }
  }

  function studentNotFound(studentId) {
    return !students.map((item) => (
      studentId === item.id
    )).includes(true);
  }

  function alreadyInProject(studentId) {
    return project.members.items.map((item) => (
      studentId === item.student.id
    )).includes(true);
  }

  if (project !== null) {
    return (
      <div style={styles.container}>
        <h2>{"Add Member to Project " + project.name}</h2>
        <input
          onChange={event => setInput('student', event.target.value)}
          value={formState.student}
          placeholder="Student"
          list="studentList"/>
        <datalist id="studentList">
          {
            students ? students.map((student, index) => (
            <option key={index}>
                {student.name + ", " + student.id}
            </option>
            )) : null
          }
        </datalist>
        <input
          onChange={event => setInput('membership', event.target.value)}
          value={formState.membership}
          placeholder="Role"
          list="roleList"/>
        <datalist id="roleList">
          {
            project.roles ? project.roles.map((role, index) => (
            <option key={index} value={role}>
                {role}
            </option>
            )) : null
          }
        </datalist>
        <button style={styles.button} onClick={addMember}>Add Member</button>
      </div>
    )
  } else if(!valid) {
    console.log("Invalid project id: " + projectId);
    return null;
  }
  else return null;
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  student: {  marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  studentName: { fontSize: 20, fontWeight: 'bold' },
  studentField: { marginBottom: 0 },
  link : {textDecoration: 'none', color: 'black'},
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  removeButton: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px', marginTop: 10 }
}

export default AddProjectMemberRolePage;