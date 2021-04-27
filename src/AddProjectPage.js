import React, { useState, useEffect } from 'react';
import Amplify, { API, graphqlOperation, Storage } from 'aws-amplify';
import { createProject } from './graphql/mutations';
import awsExports from "./aws-exports";
import { listProjectKeyWords } from './customgraphql/customqueries';
import Select from 'react-dropdown-select';
import { PhotoPicker } from 'aws-amplify-react';
import { v4 as uuid } from 'uuid';
Amplify.configure(awsExports);

const initialState = { name: '', description: '', commandCenterLink: '', roles: [], keywords: [] }
var setKeywords = new Set();
var setArrKey = []; //Array with keywords and its unique key to be added
var selectedValues = []; //Array of selected values from the <Select> tag
var keywords = []; //All the keywords that any project may have

let photos = []
function previewDom(file) {
    const reader = new FileReader()
    let dom = document.createElement("img")
    reader.onload = function (e) {
        const url = e.target.result
        dom.src = url
    }
    reader.readAsDataURL(file);
    dom.height = 100
    return dom
}
function setPhoto(file) {
    photos.push(file)
    document.getElementById("preview").appendChild(previewDom(file));
}

const AddProjectPage = () => {

    const [formState, setFormState] = useState(initialState)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        fetchKeywords()
    })

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }

    //fetching all the keywords to be able to display in the dropdown (if it has been previously
    //added)
    async function fetchKeywords() {
        try {
            //Gets all the data from the database
            const queryData = await API.graphql(graphqlOperation(listProjectKeyWords));
            keywords = queryData.data.listProjects.items;
            for (let i = 0; i < keywords.length; i++) {
                for (let j = 0; j < keywords[i].keywords.length; j++) {
                    setKeywords.add(keywords[i].keywords[j]);
                }
            }
            var i = 0;
            //Added setArrKey to be able to use in the <Select> tag below
            for (let item of setKeywords.values()) {
                if (item !== "") {
                    setArrKey[i] = { label: item, value: item };
                    i++;
                }
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    //Does the process of adding the projects
    async function addProject() {
        try {
            //if there is no name or description, then user will be alerted
            if (!formState.name || !formState.description) {
                alert("Name and description are required fields of Project.");
                return;
            }
            const project = { ...formState }

            //To be able to search the projects by name, we add the project's name in lowercase
            project.searchString = project.name.toLowerCase();

            //To be able to search the projects by keywords, we loop through all the keywords selected 
            //by the user and is added to project.searchString in lowercase
            for (let i = 0; i < project.keywords.length; i++) {
                project.searchString += project.keywords[i].toLowerCase();
            }

            //Actually saves the project

            const projectData = await API.graphql(graphqlOperation(createProject, { input: project }));
            project.id = projectData.data.createProject.id;

            setProjects([...projects, project]);
            setFormState(initialState);

            console.log(project.id);
            if (photos.length > 0) {
                // Upload image to S3
                let urls = []
                for (let i = 0; i < photos.length; i++) {
                    const fext = photos[i].name.toLowerCase().split('.').pop()
                    const fname = uuid() + "." + fext
                    const dir = "assets/projectpic/" + project.id + "/" + fname;
                    const result = await Storage.put(dir, photos[i], {
                        contentType: 'image/*'
                    })
                    urls.push(result.key)
                    // console.log(result.key)
                }
                project.pictureURLs = urls
                console.log('successfully uploaded files...')
            }
            window.location.href = '/Projects';
        } catch (err) {
            console.log('error creating project:', err)
        }
    }

    //When there are changes made in the <Select> input, this function is executed
    //Essentially, updates the formState for the keywords with all the selected keywords
    //Also makes sure to set the formState for other input fields with the values
    async function onChanges(selectedList) {
        var newList = [];
        selectedValues = selectedList;
        var i = 0;
        for (let item of selectedValues.values()) {
            newList[i] = item.value;
            i++;
        }
        setFormState({ name: formState.name, description: formState.description, commandCenterLink: formState.commandCenterLink, roles: formState.roles, keywords: newList });
    }

    return (
        <div style={styles.flexleft}>

            <h2>Create Project</h2>
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
                options={setArrKey} //All the values that need to be displayed in the dropdown
                displayValue="value"
                selectedValues={selectedValues} //The Array of selected values
                id="multi"
                onChange={onChanges}
            />
            <div style={styles.flexright}>
                <h3>Project photos</h3>
                <div id="preview" style={styles.photoinput}>
                    <PhotoPicker
                        preview
                        headerText=" "
                        headerHint=" "
                        onPick={event => setPhoto(event.file)}
                    />
                </div>
            </div>
            <button id="createprojectbut" style={styles.button} onClick={addProject}>Create Project</button>
        </div>
    )
}

const styles = {
    container: { width: '100%', flexWrap: 'wrap', margin: '0 auto', display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: 20 },
    flexleft: { minWidth: 400 },
    flexright: { minWidth: 400 },
    student: { marginBottom: 15 },
    input: { border: 'none', display: 'block', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
    studentName: { fontSize: 20, fontWeight: 'bold' },
    studentField: { marginBottom: 0 },
    filter: { multiselectContainer: { width: 240 }, optionContainer: { backgroundColor: 'orange' }, searchBox: { border: "none", "borderBottom": "2px solid orange", "borderRadius": "0px" } },
    link: { textDecoration: 'none', color: 'black' },
    button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' },
    removeButton: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px', marginTop: 10 },
    photoinput: { textAlign: 'center', border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 }
}

export default AddProjectPage;
