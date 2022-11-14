import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';
import './Navbar.css';

export default class Navbar extends Component {
render(){
  return (
    <>
      <div className='navbar'>
        <div className='navbar-container container'>
          <Link to='/' className='navbar-logo'>
            <MdFingerprint className="navbar-icon" />
            SWP490
          </Link>
          {this.props.custom}
        </div>

      </div>
    </>
  )}
}


//export default Navbar;