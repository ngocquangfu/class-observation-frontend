import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';
import './Navbar.css';
import image1 from '../../../assets/images/svg-1.png'
export default class Navbar extends Component {
render(){
  return (
    <>
      <div className='navbar'>
        <div className='navbar-container container'>
          <Link to='/' className='navbar-logo'>
            {/* <MdFingerprint className="navbar-icon" />
            SWP490 */}
            <img className="navbar-icon" src={image1} height="40px" alt='' />
          </Link>
          {this.props.custom}
        </div>

      </div>
    </>
  )}
}


//export default Navbar;