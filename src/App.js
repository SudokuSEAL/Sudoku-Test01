/* src/App.js */
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Students from './Students';
import Student from './Student';
import Projects from './Projects';
import Project from './Project';
import AddStudentPage from './AddStudentPage';
import Error from './Error';
import Navigation from './Navigation';
// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import AddProjectPage from "./AddProjectPage";

class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Navigation/>
            <Switch>
              <Route path="/" component={Home} exact/>
              <Route path="/students" component={Students} exact/>
              <Route path="/students/:studentId" component={Student}/>
              <Route path="/projects" component={Projects} exact/>
              <Route path="/projects/:projectId" component={Project}/>
              <Route path="/AddStudentPage" component={AddStudentPage}/>
              <Route path="/AddProjectPage" component={AddProjectPage}/>
              <Route component={Error}/>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
 
//export default withAuthenticator(App);
export default App;
