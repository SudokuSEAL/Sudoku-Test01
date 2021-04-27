import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { PhotoPicker } from 'aws-amplify-react';
import { updateStudent } from './graphql/mutations';
import { getStudentForEdit, listEnumValues } from './customgraphql/customqueries';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { id: '', name: '', nickname: '', email: '', major: '' };
let photo = null;

const EditStudentPage = () => {
  
  let { studentId } = useParams();
  
  const [student, setStudent] = useState(null);
  const [valid, setValid] = useState(true);
  const [formState, setFormState] = useState(initialState);
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    fetchData();
  })

  function fetchData() {
    fetchStudent();
    fetchMajors();
  }

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  function setPhoto(file) {
    photo = file;
  }

  async function fetchMajors() {
    try {
      const majorData = await API.graphql(graphqlOperation(listEnumValues, {enum: "Major"}));
      const majors = majorData.data.enum.enumValues;
      setMajors(majors);
      console.log(majors[0].name);
      formState.major = majors[0].name;
    } catch (err) { console.log('error fetching majors', err) }
  }

  async function fetchStudent() {
    console.log("fetching student: " + studentId);
    try {
        const studentData = await API.graphql(graphqlOperation((getStudentForEdit), { id:studentId }));
        const tempStudent = studentData.data.getStudent;
        setStudent(tempStudent);
        setFormState(tempStudent);
        if (student === null) {
          setValid(false);
        }
    } catch (err) {
        console.log('error fetching students', err);
    }
  }

  async function editStudent() {
    try {
      if (!formState.name || !formState.email) {
        alert("Name and email are required fields of Student.");
        return;
      }
      if (photo) {
        // Upload image to S3
        const fext = photo.name.toLowerCase().split('.').pop()
        const fname = encodeURI(student.email) + "." + fext;
        const dir = "assets/profilepic/" + fname;
        const result = await Storage.put(dir, photo, {
          contentType: 'image/*'
        })
        student.photoURL = result.key
        console.log(result.key)
        console.log('successfully uplaoded file...')
      }
      const tempStudent = { ...formState }

      //Sets the value of search string to the student's name concatenated with the student's nickname
      tempStudent.searchString = tempStudent.name.toLowerCase() + tempStudent.nickname.toLowerCase();
      await API.graphql(graphqlOperation(updateStudent, {input: tempStudent}));
      window.location.href='/Students/' + studentId;
    } catch (err) {
      console.log('error editing student:', err)
    }
  }
  if (document.getElementById("profilepic") != null) {
    Storage.get(student.photoURL).then (result => {
      console.log(result)
      document.getElementById("profilepic").src=result
    })
  }

  if (formState !== null && student !== null) {
    return (
      <div style={styles.container}>
        <h2>Edit Student</h2>
        <img src="" style={{maxWidth: 400}} id="profilepic" alt=""/>
        <input
            onChange={event => setInput('name', event.target.value)}
            style={styles.input}
            value={formState.name}
            placeholder="Name"
        />
        
        <input
            onChange={event => setInput('nickname', event.target.value)}
            style={styles.input}
            value={formState.nickname}
            placeholder="Nickname"
        />
        <input
            onChange={event => setInput('email', event.target.value)}
            style={styles.input}
            value={formState.email}
            placeholder="Email"
        />
        <select
            onChange={event => setInput('major', event.target.value)}
            style={styles.input}
            value={formState.major}
        >
          {
              majors.map((major, index) => (
              <option key={index} value={major.name}>
                  {major.name}
              </option>
              ))
          }
        </select>
        <div style={styles.input}>
          <PhotoPicker
            preview
            headerText="New profile picture"
            headerHint=" "
            onPick={event => setPhoto(event.file)}
          />
        </div>
        <button style={styles.button} onClick={editStudent}>Edit Student</button>
      </div>
    )
  } else if(!valid) {
    return (
      <div>
          <p>Invalid student id: { studentId }</p>
      </div>
    );
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

export default EditStudentPage;