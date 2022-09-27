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
    <div className='container-login'>

      <div className='button-login'>
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
              Login
            </Button>
          </Link>
        )}
       
     
      </div>

    </div>
  )
}

export default Login