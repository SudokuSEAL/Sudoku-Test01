import React from 'react';
 
import { NavLink } from 'react-router-dom';
// import { AmplifySignOut } from '@aws-amplify/ui-react';
 
const Navigation = () => {
    return (
       <div style={styles.Navbar}>
          {/* <NavLink to="/" style={styles.Navlink}> <div> <AmplifySignOut/> </div> </NavLink> */}
          <NavLink to="/" style={styles.Navlink}>Home</NavLink>
          <NavLink to="/students" style={styles.Navlink}>Students</NavLink>
          <NavLink to="/projects" style={styles.Navlink}>Projects</NavLink>
       </div>
    );
}

const styles = {
    Navbar: {backgroundColor: '#333', overflow: 'hidden'},
    Navlink: {display: 'inline-block', color: 'white', padding: '14px 16px', textDecoration: 'none'}
  }
 
export default Navigation;