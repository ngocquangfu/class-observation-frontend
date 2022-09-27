import React from 'react';
import Sections from './Sections';
import {homeObjOne, homeObjThree, homeObjTwo} from './Data';


function Home() {
    return (
      <>
        <Sections {...homeObjOne} />
        <Sections {...homeObjThree} />
        <Sections {...homeObjTwo} />


      </>
    );
  }
  
  export default Home;