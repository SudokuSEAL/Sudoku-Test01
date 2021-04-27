import logo from './logo.svg';
import GoogleLogin from 'react-google-login';
import Amplify from 'aws-amplify';
import awsExports from "./aws-exports";
import './App.css';
Amplify.configure(awsExports);

const responseGoogle = (response) => {
  console.log(response);
}

function App() {
  return (
    <div className="App">
      <GoogleLogin
        clientId="659917607413-k1cl2d03eom1m8h6aqrrim2s29o8epg4.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
