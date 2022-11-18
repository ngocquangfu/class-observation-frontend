import React from 'react';
import Home from '../views/pages/home/Home';
import Error404 from '../views/pages/error/error404'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from '../views/pages/authetication/login/Login';
import Admin from '../views/pages/authetication/admin/index/Admin';
import Lecture from '../views/pages/authetication/lecture/LectureContainer';
import LectureDetail from '../views/pages/authetication/lecture/LectureDetailContainer';
import HeadContainer from '../views/pages/authetication/headSubject/PlanContainer';
import HeadModalPlan from '../views/pages/authetication/headSubject/ModalPlanContainer';
import HeadPlanDetail from '../views/pages/authetication/headSubject/PlanDetailContainer';
import TrainContainer from '../views/pages/authetication/training/TrainingContainer';
// import TrainChange from '../views/pages/authetication/training/TrainingChangeContainer';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/lecture" exact element={<Lecture/>}/>
        <Route path="/lecture/:Id" exact element={<LectureDetail/>}/>
        <Route path="/admin" exact element={<Admin/>}/>
        <Route path="/head" exact element={<HeadContainer/>}/>
        <Route path="/head-plan" exact element={<HeadModalPlan/>}/>
        <Route path="/head-plan/:Id" exact element={<HeadPlanDetail/>}/>
        <Route path="/train" exact element={<TrainContainer/>}/>
        <Route path='*' exact element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  );
}