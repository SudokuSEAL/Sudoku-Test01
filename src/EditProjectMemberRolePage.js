import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectMember, getProjectMemberForEdit, getProjectForEdit} from './customgraphql/customqueries';
import { updateProjectMember, updateProject } from './graphql/mutations';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { membership: '' }

const EditProjectMemberRolePage = () => {
  const {projectId, projectMemberId} = useParams();
  const [projectMember, setProjectMember] = useState(null);
  const [project, setProject] = useState(null);
  const [formState, setFormState] = useState(initialState);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    fetchProjectMember();
    fetchProject();
  })

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchProject() {
    try {
      const projectData = await API.graphql(graphqlOperation((getProjectForEdit), { id: projectId }));
      setProject(projectData.data.getProject);
      if (project === null) setValid(false);
    } catch (err) {
      console.log('error fetching project', err);
    }
  }

  // fetching full projectMemberData, and shortened projectMemberData for editing.
  // We need the full projectMemberData to access project and student names, etc.
  // Setting FormState to shortened projectMemberData to avoid errors
  async function fetchProjectMember() {
    try {
      const projectMemberData_full = await API.graphql(graphqlOperation((getProjectMember), { id:projectMemberId }));
      const projectMemberData_forEdit = await API.graphql(graphqlOperation((getProjectMemberForEdit), { id:projectMemberId }));
      const tempProjectMember_full = projectMemberData_full.data.getProjectMember;
      const tempProjectMember_forEdit = projectMemberData_forEdit.data.getProjectMember;
      setProjectMember(tempProjectMember_full);
      setFormState(tempProjectMember_forEdit);

      if (projectMember === null) {
        setValid(false);
      }
    } catch (err) {
      console.log('project member id:', projectMemberId);
      console.log('error fetching project member ', err);
    }
  }

  async function editProjectMember() {
    try {
      if (!formState.membership) {
        alert("membership is a required field for project members.");
        return;
      }
      if (project.roles.indexOf(formState.membership) === -1) {
        project.roles.push(formState.membership);
        const tempProject = { ...project };
        await API.graphql(graphqlOperation((updateProject), { input: tempProject }));
      }
      const tempProjectMember = { ...formState };
      await API.graphql(graphqlOperation(updateProjectMember, {input: tempProjectMember}));
      window.location.href='/projects/' + projectMember.project.id + '/members/' + projectMemberId;
    } catch (err) {
      console.log('error editing project member:', err)
      console.log(err);
    }
  }

  if (formState !== null && projectMember !== null && project !== null) {
    return (
      <div style={styles.container}>
        <h2>{"Edit Member: '" + projectMember.student.name + "' for Project: '" + projectMember.project.name + "'"}</h2>
        <p>{projectMember.student.name}</p>
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
        <button style={styles.button} onClick={editProjectMember}>Save Changes</button>
      </div>
    )
  } else if(!valid) {
    console.log("Invalid project member id: "+ projectMemberId);
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

export default EditProjectMemberRolePage;