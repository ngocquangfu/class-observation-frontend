import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MdFingerprint } from 'react-icons/md';
import './Navbar.css';

export default class Navbar extends Component {
//   const [click, setClick] = useState(false);
//   const handleClick = () => setClick(!click);
//   const [button, setButton] = useState(true);
//   const closeMobileMenu= () =>setClick(false);

//   const showButton=()=> {
//     if(window.innerWidth<=960){
//       setButton(false);
//     }else{
//       setButton(true);
//     }
//   }
// window.addEventListener('resize', showButton);

render(){
  return (
    <>
      <div className='navbar'>
        <div className='navbar-container container'>
          <Link to='/' className='navbar-logo'>
            <MdFingerprint className="navbar-icon" />
            SWP490
          </Link>
          {/* <ul className={click ? 'nav-menu active ' : 'nav-menu'}>
          <li className='nav-btn'>
                {button ? (
                  <Link to='/login' className='btn-link' component={Login}>
                    <Button buttonStyle='btn--outline'>Login</Button>
                  </Link>
                ) : (
                  <Link to='/login' className='btn-link' onClick={closeMobileMenu}>
                    <Button
                      buttonStyle='btn--outline'
                      buttonSize='btn--mobile'
                      onClick={closeMobileMenu}
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </li>
          </ul> */}
          {this.props.custom}
        </div>

      </div>
    </>
  )}
}


//export default Navbar;