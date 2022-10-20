import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../../../components/navbar/Navbar';
import './Login.css';

function Login() {

  
  return (
    
    <>
    <NavBar/>
    <div id="login">
      <form name='form-login'>
      <button type="button" class="login-with-google-btn" >
  Sign in with Google
</button>
<br/>
        
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