import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'

//import awsExports from "./aws-exports"
//Amplify.configure(awsExports)

const Home = () => {
  const [user, setUser] = useState(null)

  useEffect (() => {
    getUser().then(async (userData) => {
      setUser(userData)
      console.log(userData)
    });
  })

  function getUser() {
    return Auth.currentAuthenticatedUser()
      .then(userData => userData)
      .catch(() => console.log('Not signed in'));
  }

  return (
    <div>
      <p>Signed in as: {user ? user.attributes.email : 'None'}</p>
      {
        user ?
        <button onClick={() => Auth.signOut()}>Sign Out</button>
        :
        <button onClick={
          () => {
            Auth.federatedSignIn({provider: 'Google'});
            getUser().then(async (userData) => {
              setUser(userData)
              console.log(userData)
            });
          }
        }>Federated Sign In</button>
      }
    </div>
  )
}

export default Home;
