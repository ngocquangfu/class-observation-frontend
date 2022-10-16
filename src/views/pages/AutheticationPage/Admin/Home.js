import MainDash from './MainDash/MainDash';
import RightSide from './RigtSide/RightSide';
import Sidebar from './Sidebar/Sidebar';

function Home() {
    return (
      <>
        <Sidebar/>
        <MainDash/>
        <RightSide/>
      </>
    );
  }
  
  export default Home;