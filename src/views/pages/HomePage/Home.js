import React from 'react';
import Sections from './Sections';
import {homeObjOne, homeObjThree, homeObjTwo} from './Data';
import NavBar from './Navbar';


function Home() {
    return (
      <>
       <NavBar/>
        <Sections {...homeObjOne} />
        <Sections {...homeObjThree} />
        <Sections {...homeObjTwo} />
      </>
    );
  }
  
  export default Home;