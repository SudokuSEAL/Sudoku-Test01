import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { updateProject } from './graphql/mutations';
import { getProjectForEdit } from './customgraphql/customqueries';
import awsExports from "./aws-exports";
import Select from 'react-dropdown-select';
import { listProjectKeyWords } from './customgraphql/customqueries';
import AlbumPage from './AlbumPage';
Amplify.configure(awsExports);

const initialState = { id: '', name: '', description: '', commandCenterLink: '', members: '', roles: [], keywords: [] };
var listKeyWords = []; //Currently/Originally added keywords
var selectedValues = []; //Keywords selected by the user
var setKeywords = new Set();
var setArrKey = []; //All keywords from the DB
var keywords = []; //All the keywords are stored when fetched from DB

const EditProjectPage = () => {
  let { projectId } = useParams();

  const [project, setProject] = useState(null)
  const [valid, setValid] = useState(true);
  const [formState, setFormState] = useState(initialState);
  const [role, setRole] = useState('');

  useEffect(() => {
    fetchProject()
    fetchKeywords()
  })

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  //Handles adding roles
  async function addRole(value) {
    if (value === '' || formState.roles.indexOf(value) !== -1) {
      console.log(formState);
      return;
    }
    let newRoles = formState.roles;
    newRoles.push(value);
    setFormState({ ...formState, roles: newRoles });
    setRole('');
  }

  //Handles removing added roles
  async function removeRole(value) {
    const index = formState.roles.indexOf(value);
    console.log(index);
    if (index !== -1) {
      let newRoles = formState.roles;
      newRoles.splice(index, 1);
      setFormState({ ...formState, roles: newRoles });
    } else {
      return;
    }
  }

  //Fetches all the keywords
  async function fetchKeywords() {
    try {
      const queryData = await API.graphql(graphqlOperation(listProjectKeyWords));
      //All keywords are stored in keywords
      keywords = queryData.data.listProjects.items;
      for (let i = 0; i < keywords.length; i++) {
        for (let j = 0; j < keywords[i].keywords.length; j++) {
          setKeywords.add(keywords[i].keywords[j]);
        }
      }

      //To be able to search the projects by keywords, we loop through all the keywords selected 
      //by the user and is added to project.searchString in lowercase
      var i = 0;
      for (let item of setKeywords.values()) {
        if (item !== "") {
          setArrKey[i] = { label: item, value: item };
          i++;
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  //Fetches the particular project, in question
  async function fetchProject() {
    try {
      const projectData = await API.graphql(graphqlOperation((getProjectForEdit), { id: projectId }));
      const tempProject = projectData.data.getProject;
      for (let i = 0; i < tempProject.keywords.length; i++) {
        listKeyWords[i] = { label: tempProject.keywords[i], value: tempProject.keywords[i] }
      }
      console.log(tempProject);
      setProject(tempProject);
      setFormState(tempProject);
      if (project === null) setValid(false);
    } catch (err) {
      console.log('error fetching project', err);
    }
  }

  //When there are changes to the dropdown (values are selected/unselected), this executes
  async function onChanges(selectedList) {
    var newList = [];
    selectedValues = selectedList;
    var i = 0;
    for (let item of selectedValues.values()) {
      newList[i] = item.value;
      i++;
    }
    //The form state is updated with user values; Especially assigns the keywords entered by user to keywords
    setFormState({ id: formState.id, name: formState.name, description: formState.description, commandCenterLink: formState.commandCenterLink, roles: formState.roles, keywords: newList });
  }

  //Handles the actual editing of the project
  async function editProject() {
    try {
      //if the values of name and description are not entered, an alert is generated
      if (!formState.name || !formState.description) {
        alert("Name and description are required fields of Project.");
        return;
      }
      const tempProject = { ...formState };
      tempProject.searchString = tempProject.name.toLowerCase();
      for (let i = 0; i < tempProject.keywords.length; i++) {
        tempProject.searchString += tempProject.keywords[i].toLowerCase();
      }
      console.log(tempProject);
      await API.graphql(graphqlOperation(updateProject, { input: tempProject }));
      window.location.href = '/Projects/' + projectId;
    } catch (err) {
      console.log('error editing project:', err)
      console.log(err);
    }
  }

  if (project !== null && formState !== null) {
    return (
      <div style={styles.container}>
        <div style={styles.flexleft}>
        <h2>Edit Project</h2>
        <input
          onChange={event => setInput('name', event.target.value)}
          style={styles.input}
          value={formState.name}
          placeholder="Name"
        />
        <input
          onChange={event => setInput('description', event.target.value)}
          style={styles.input}
          value={formState.description}
          placeholder="Description"
        />
        <input
          onChange={event => setInput('commandCenterLink', event.target.value)}
          style={styles.input}
          value={formState.commandCenterLink}
          placeholder="Command Center Link"
        />
        <Select
          autoComplete="off"
          style={styles.input}
          placeholder="Select Keywords"
          multi
          create
          onCreateNew={(item) => console.log('%c New item created ', 'background: #555; color: tomato', item)}
          options={setArrKey} // All the options for keywords
          values={listKeyWords} //originally selected keywords
          selectedValues={selectedValues} //values that are selected
          id="multi"
          onChange={onChanges}
        />
        <input
          onChange={event => setRole(event.target.value)}
          style={styles.input}
          value={role}
          placeholder="Role"
        />
        <button style={styles.button} onClick={() => addRole(role)}>Add role</button>
        <h2>Roles: </h2>
        {
          project.roles.map((role, index) => (
            <div key={index}>
              <p>{role}</p>
              <button style={styles.button} onClick={() => removeRole(role)}>Remove Role</button>
            </div>
          ))
        }
        <button style={styles.button} onClick={editProject}>Save Changes</button>
        </div>
        <AlbumPage project={projectId}/>
      </div>
    )
  } else if (!valid) {
  console.log("Invalid project id: " + formState.name);
  return null;
}
else return null;
}

const styles = {
  container: { width: '100%', flexWrap: 'wrap', margin: '0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 20 },
  flexleft: { minWidth: 400 },
  project: { marginBottom: 15 },
  input: { border: 'none', display: 'block', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  projectName: { fontSize: 20, fontWeight: 'bold' },
  projectField: { marginBottom: 0 },
  link: { textDecoration: 'none', color: 'black' },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  removeButton: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px', marginTop: 10 }
}

export default EditProjectPage;