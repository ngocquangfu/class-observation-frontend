import React from 'react';
import Sections from './sections/Sections';
import {homeObjOne, homeObjThree, homeObjTwo} from './Data';
import NavBar from '../../components/navbar/Navbar';


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