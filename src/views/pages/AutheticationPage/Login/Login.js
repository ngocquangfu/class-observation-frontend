import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import './Login.css';

function Login() {

  const [button, setButton] = useState(true);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  }
  window.addEventListener('resize', showButton);
  return (
    // <div className='container-login'>
    //   <div className='button-login'>
    //     {button ? (
    //       <Link to='/login' className='btn-link' component={Login}>
    //         <Button buttonStyle='btn--outline' buttonColor={'white'} buttonSize='btn--long'>Sign in @fpt.edu.vn</Button>
    //       </Link>
    //     ) : (
    //       <Link to='/login' className='btn-link' >
    //         <Button
    //           buttonStyle='btn--outline'
    //           buttonSize='btn--medium'
    //         >
    //           Login
    //         </Button>
    //       </Link>

    //     )}

    //   </div>

    // </div>
    <div id="login">
      <form name='form-login'>
        {button ? (
          <Link to='/login' className='btn-link' component={Login}>
            <Button buttonStyle='btn--outline' buttonColor={'white'} buttonSize='btn--long'>Sign in @fpt.edu.vn</Button>
          </Link>
        ) : (
          <Link to='/login' className='btn-link' >
            <Button
              buttonStyle='btn--outline'
              buttonSize='btn--medium'
            >
              Sign in @fpt.edu.vn
            </Button>
          </Link>

        )}
        <input type="text" id="user" placeholder="Username" />

        <input type="password" id="pass" placeholder="Password" />
        <label for="location">Choose a location:</label>

        <select name="location" id="location">
          <option value="1">Ha Noi</option>
          <option value="2">Da Nang</option>
          <option value="3">Hai Phong</option>
          <option value="4">Tp.HCM</option>
        </select>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login