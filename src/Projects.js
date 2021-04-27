import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { deleteProject } from './graphql/mutations';
import { deleteProjectMember } from './customgraphql/custommutations';
import { searchProjects } from './customgraphql/customqueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import awsExports from "./aws-exports";
import sortBy from 'lodash/sortBy';
import AlbumPage from './AlbumPage';

Amplify.configure(awsExports);

const initialStateSearch = { input: '' }

const delete_icon = <FontAwesomeIcon icon={faTimesCircle} size="lg" />
var clear = false;
const Projects = () => {
  const [projects, setProjects] = useState([])
  const [formStateSearch, setFormStateSearch] = useState(initialStateSearch)

  useEffect(() => {
    fetchProjects()
  })

  function setInputSearch(key, value) {
    setFormStateSearch({ ...formStateSearch, [key]: value })
  }

  //Fetches all the projects
  async function fetchProjects() {
    try {
      const searchval = { ...formStateSearch }
      //Checks if the clear is true and if it is, then the search value is cleared
      if (clear === true) {
        clear = false;
        searchval.input = '';
      }

      //Gets all the projects and stores it into projectData
      const projectData = await API.graphql(graphqlOperation(searchProjects, { input: searchval.input.toLowerCase() }));
      var projects = projectData.data.listProjects.items;

      //A message is displayed to the user if there are no students in the database
      if (projects.length === 0 && searchval.input === '') {
        document.getElementById("removebut").style.display = "block";
        document.getElementById("removebut").style.backgroundColor = "green";
        document.getElementById("removebut").innerHTML = "There are no projects. Add projects to view them.";
      } 
      
      //A message is displayed to the user if there are no students in the database 
      //that match their inputted search value and/or the selected filter options
      else if (projects.length === 0) {
        document.getElementById("removebut").innerHTML = "There are no project results with that search value.";
        document.getElementById("removebut").style.backgroundColor = "red";
        document.getElementById("removebut").style.display = "block";
      } else {
        try {
          document.getElementById("removebut").style.display = "none";
        } catch (err) {
          console.log("removebut doesnt exist");
        }
      }

      //sorts the project in alphabetical order
      projects = sortBy(projects, 'searchString');
      setProjects(projects);
    } catch (err) { console.log('error fetching results', err) }
  }

  //Removes the project
  async function removeProject(project) {
    try {
      if (projects.length === 0) return;
      project.members.items.forEach(async (item) => (
        await API.graphql(graphqlOperation(deleteProjectMember, { input: { id: item.id } }))
      ))
      await API.graphql(graphqlOperation(deleteProject, { input: { id: project.id } }));
      removeAlbum(project.id);
      fetchProjects();
    }
    catch (err) { console.log('error deleting project', err) }
  }

  async function removeAlbum(id) {
    let path = "assets/projectpic/" + id + "/";
    let s3images = await Storage.list(path);
    await Promise.all(s3images.map(async image => {
      await Storage.remove(image.key);
    }))
  }

  //To make searching for values happen when the user types in the box
  function handleChange(event) {
    setFormStateSearch({ value: event.target.value });
    setInputSearch('input', event.target.value);
    fetchProjects();
  }

  //When the X-button (clear button) is pressed, all values in search field is cleared
  async function clearResults() {
    setFormStateSearch({ value: '' });
    setInputSearch('input', '');
    clear = true;
    fetchProjects();
  }

  return (
    <div style={styles.container}>
      <NavLink to="/AddProjectPage">
        <button style={styles.button}>Add Project</button>
      </NavLink>
      <h2>Project Dashboard</h2>
      <div>
        <input
          style={styles.input}
          onInput={handleChange}
          onKeyUp={handleChange}
          value={formStateSearch.input}
          placeholder="Search"
        />
        <button style={styles.img} onClick={clearResults}>{delete_icon}</button>
      </div>
      <h3 style={styles.alert} id="removebut"> </h3>
      {
        projects.map((project, index) => (
          <div key={project.id ? project.id : index} style={styles.project}>
            <a href={"/projects/" + project.id} style={styles.link}><p style={styles.projectName}>{project.name}</p></a>
            <p style={styles.projectField}>{project.description}</p>
            <p style={styles.projectField}>{project.commandCenterLink}</p>
            <ul style={styles.projectField}>{ project.keywords ? project.keywords.map((keywords, index) => (
              <li key={index}>{keywords}</li>
            )) : delete_icon }</ul>
            <button style={styles.removeButton} onClick={() => removeProject(project)}>Remove Project</button>
            <AlbumPage project={project.id} carousel={ true }/>
          </div>
        ))
      }
    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 20 },
  project: { marginBottom: 15 },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18, marginTop: 10 },
  projectName: { fontSize: 20, fontWeight: 'bold' },
  projectField: { marginBottom: 0 },
  link: { textDecoration: 'none', color: 'black' },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  removeButton: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px', marginTop: 10 },
  alert: { backgroundColor: 'red', color: 'white' },
  img: { paddingLeft: 10 }
}

export default Projects;
