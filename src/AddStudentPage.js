import React, { useState, useEffect } from 'react'
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify'
import { PhotoPicker } from 'aws-amplify-react'
import { listEnumValues} from './customgraphql/customqueries'
import { createStudent } from './graphql/mutations'
import awsExports from "./aws-exports"
Amplify.configure(awsExports)

const initialState = { name: '', nickname: '', email: '', major: ''}
let photo = null

const AddStudentPage = () => {

  const [students, setStudents] = useState([])
  const [formState, setFormState] = useState(initialState)
  const [majors, setMajors] = useState([]);

  useEffect(() => {
    fetchMajors()
  })

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

  async function addStudent() {
    try {
      if (!formState.name || !formState.email) {
        alert("Name and email are required fields of Student.");
        return;
      }
      const student = { ...formState }

      //Sets the value of search string to the student's name concatenated with the student's nickname
      student.searchString = student.name.toLowerCase() + student.nickname.toLowerCase(); 
      console.log(student);
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
      console.log(student)
      const studentData = await API.graphql(graphqlOperation(createStudent, {input: student}));
      student.id = studentData.data.createStudent.id;
      setStudents([...students, student])
      setFormState(initialState)
      window.location.href='/Students';
    } catch (err) {
      console.log('error creating student:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2>Create Student</h2>
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
        value={formState.major}>
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
          headerText="Profile picture"
          headerHint=" "
          onPick={event => setPhoto(event.file)}
        />
      </div>
      <button style={styles.button} onClick={addStudent}>Add Student</button>
    </div>
  )
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

export default AddStudentPage;