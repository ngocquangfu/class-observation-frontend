import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import NavBar from '../../../components/navbar/Navbar';
import './Login.css'
import {gapi} from 'gapi-script';

function Login() {
  const clientId = "700459662900-v4ouio1bgi4agnvhkqr3a4tag9e7lnb6.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });
  const [showloginButton, setShowloginButton] = useState(true);
  const [showlogoutButton, setShowlogoutButton] = useState(false);
  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
    console.log(res);
    setShowloginButton(false);
    setShowlogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    setShowloginButton(true);
    setShowlogoutButton(false);
  };
  return (

    <>
      <NavBar />
      <div id="login">
        <form name='form-login'>
          <div  >
            {showloginButton ?
              <GoogleLogin
                clientId={clientId}
                buttonText="Sign In @fpt.edu.vn"
                onSuccess={onLoginSuccess}
                onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                className="login-with-google-btn"
              /> : null}

            {showlogoutButton ?
              <GoogleLogout
                clientId={clientId}
                buttonText="Sign Out"
                onLogoutSuccess={onSignoutSuccess}
                className="login-with-google-btn"
              >
              </GoogleLogout> : null
            }
          </div>

          <br />

          <span class="custom-dropdown big">
            <select>
              <option>Hà Nội</option>
              <option>Hải Phòng</option>
              <option>Đà Nẵng</option>
              <option>TP.Hồ Chí Minh</option>
            </select>
          </span>

        </form>
      </div>
    </>
  )
}

export default Login