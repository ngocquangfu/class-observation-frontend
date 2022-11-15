import React, { Component } from 'react';
import Sections from './sections/sections';
import { homeObjOne, homeObjThree, homeObjTwo } from './data';
import NavBar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { Button } from './button/button';
import { Link } from 'react-router-dom';


export default class Home extends Component {
  
  state = {
    windowHeight: undefined,
    windowWidth: undefined
  }

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  render() {
    var button = "";
    if (window.innerWidth < 720) {
      button = (<div className='nav-btn'>
        <Link to='/login' className='btn-link-2'>
          <Button
            buttonStyle='btn--primary'
            buttonSize='btn--mobile'
          >
            Login
          </Button></Link></div>);
    } else {
      button = (<div className='nav-btn'>
        <Link to='/login' className='btn-link'>
          <Button
            buttonStyle='btn--outline'
            buttonSize='btn--medium'
          >
            Login
          </Button></Link></div>);
    }
    return (
      <>
        <NavBar custom={button} />
        <Sections {...homeObjOne} />
        <Sections {...homeObjThree} />
        <Sections {...homeObjTwo} />
      <Footer/>

      </>
    );
  }

}