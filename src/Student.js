// React
import React, { useEffect, useState } from 'react';
import {
  useParams,
  Switch, 
  Route,
  useRouteMatch
} from 'react-router-dom';
// Amplify
import { API, graphqlOperation, Storage } from 'aws-amplify';
// Queries and Mutations
import { getStudent } from './customgraphql/customqueries';
// Other Pages
import EditStudentPage from './EditStudentPage';

// Currently has some project/student relation functionality that is not working atm

const Student = () => {
  let { studentId } = useParams();
  const [valid, setValid] = useState(true);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetchStudent()
  })

  async function fetchStudent() {
    console.log("fetching student: " + studentId);
    try {
      const studentData = await API.graphql(graphqlOperation((getStudent), { id:studentId }));
      setStudent(studentData.data.getStudent);
      if (student === null) {
          setValid(false);
      } 
    } catch (err) {
      console.log('error fetching students', err);
    }
  }

  let match = useRouteMatch();
  if (student !== null) {
    console.log(student.photoURL)
    if (document.getElementById("profilepic") != null) {
      if (student.photoURL) {
        Storage.get(student.photoURL).then (result => {
          console.log(result)
          document.getElementById("profilepic").src=result
        })
      } else {
        document.getElementById("profilepic").classList.add("hidden")
      }
    }
    return (
      <Switch>
      <Route path={`${match.path}/edit`} component={EditStudentPage}/>
      <Route path={match.path}>
      <div style={styles.container}>
        <div style={styles.student}>
          <img src="" style={{maxWidth: 400}} id="profilepic" alt=""/>
          <p style={styles.studentName}>{student.name}</p>
          <p style={styles.studentField}>Nickname: {student.nickname}</p>
          <p style={styles.studentField}>Phone Number: {student.phonenumber}</p>
          <p style={styles.studentField}>Email: {student.email}</p>
          <p style={styles.studentField}>Major: {student.major}</p>
          <p style={styles.studentName}>Projects: </p>
          {
            student.projects.items.map((item, index) => (
              <div key={item.id ? item.id : index} style={styles.student}>
                <a href={"/projects/" + item.project.id} style={styles.link}>
                  <p style={styles.projectLink}>{item.project.name + " (" + item.membership + ")"}</p>
                </a>
              </div>
            ))
          }
        </div>
        <a key={student.id} href={"/students/" + student.id + "/edit"} style={styles.link}>
          <button style={styles.button}>Edit Student</button>
        </a>
      </div>
      </Route>
      </Switch>
    );
  } else if(!valid) {
    console.log("Invalid student id: " + studentId);
    return null;
  }
  else return null;
}

const styles = {
    container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
    link : {textDecoration: 'none', color: 'black'},
    projectLink: {fontWeight: 'bold'},
    student: {  marginBottom: 15 },
    studentName: { fontSize: 20, fontWeight: 'bold' },
    studentField: { marginBottom: 0 },
    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default Student;