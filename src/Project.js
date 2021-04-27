import React, { useEffect, useState } from 'react';
import {
  useParams,
  Switch,
  Route,
  useRouteMatch,
  NavLink
} from 'react-router-dom';
import { API, graphqlOperation } from 'aws-amplify';
import { getProject } from './customgraphql/customqueries';
import { deleteProjectMember } from './graphql/mutations';
import EditProjectPage from './EditProjectPage';
import EditProjectMemberRolePage from './EditProjectMemberRolePage';
import AddProjectMemberRolePage from './AddProjectMemberRolePage';
import AlbumPage from './AlbumPage';

// Currently has some project/student relation functionality that is not working atm
const Project = () => {
  let { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [members, setMembers] = useState([]);
  const [valid, setValid] = useState(true);

  useEffect(() => {
    fetchProject()
  })

  let match = useRouteMatch();

  async function fetchProject() {
    try {
      const projectData = await API.graphql(graphqlOperation((getProject), { id: projectId }));
      setProject(projectData.data.getProject);
      setMembers(projectData.data.getProject.members.items);
      if (project === null) setValid(false);
    } catch (err) {
      console.log('error fetching project', err);
    }
  }

  async function deleteMember(id) {
    try {
      await API.graphql(graphqlOperation(deleteProjectMember, { input: { id: id } }));
      fetchProject();
    } catch (err) {
      console.log('error removing student from project:', err)
    }
  }

  if (project !== null) {
    return (
      <Switch>
        <Route path={`${match.path}/edit`} component={EditProjectPage} />
        <Route path={`${match.path}/add`} component={AddProjectMemberRolePage} />
        <Route path={`${match.path}/members/:projectMemberId/edit`} component={EditProjectMemberRolePage} />
        <Route path={match.path}>
          <div style={styles.container}>
            <div style={styles.project}>
              <p style={styles.projectName}>{project.name}</p>
              <p style={styles.projectField}>Description: {project.description}</p>
              <p style={styles.projectField}>Command Center Link: {project.commandCenterLink}</p>
              <ul style={styles.projectField}>{project.keywords ? project.keywords.map((keywords, index) => (
                <li key={index}>{keywords}</li>
              )) :"No keywords" }</ul>
              <a key={project.id} href={"/projects/" + project.id + "/edit"} style={styles.link}>
                <button style={styles.button}>Edit Project</button>
              </a>
              <p style={styles.projectName}>Members: </p>
              <NavLink to={`/projects/` + projectId + '/add'}>
                <button style={styles.button}>Add Member</button>
              </NavLink>
              {
                members.map((item, index) => (
                  <div key={item.id ? item.id : index} style={styles.student}>
                    <a href={"/students/" + item.student.id} style={styles.link}><p style={styles.studentLink}>{item.student.name}</p></a>
                    <p >{"Membership: " + item.membership}</p>
                    <NavLink to={`/projects/` + projectId + '/members/' + item.id + "/edit"}>
                      <button style={styles.button}>Edit Member</button>
                    </NavLink>
                    <button style={styles.button} onClick={() => deleteMember(item.id)}>Delete Member</button>
                  </div>
                ))
              }
            </div>
            <AlbumPage project={project.id} carousel={ true }/>
          </div>
        </Route>
      </Switch>
    );
  } else if (!valid) {
    console.log("Invalid project id: " + projectId);
    return null;
  }
  else return null;
}

const styles = {
  container: { width: '100%', flexWrap: 'wrap', margin: '0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 20 },
  project: { minWidth: 400, marginBottom: 15 },
  link : {textDecoration: 'none', color: 'black'},
  studentLink: {fontWeight: 'bold'},
  projectName: { fontSize: 20, fontWeight: 'bold' },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
  projectField: { marginBottom: 0 },
}

export default Project;