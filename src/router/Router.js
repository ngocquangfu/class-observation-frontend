import React from 'react';
import Home from '../views/pages/home/home';
import Error404 from '../views/pages/error/error404'
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Login from '../views/pages/authetication/login/login';
import Admin from '../views/pages/authetication/admin/index/admin';
import Lecture from '../views/pages/authetication/lecture/index/Lecture';
import Result from '../views/pages/authetication/lecture/result/Result';
import HeadSubject from '../views/pages/authetication/headSubject/index/ModalPlanContainer';
import TimeTable from '../views/pages/authetication/headSubject/timeTable/TimeTable';
import Response from '../views/pages/authetication/headSubject/response/Response';


export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/lecture" exact element={<Lecture/>}/>
        <Route path="/result" exact element={<Result/>}/>
        <Route path="/admin" exact element={<Admin/>}/>
        <Route path="/head-subject" exact element={<HeadSubject/>}/>
        <Route path="/time-table" exact element={<TimeTable/>}/>
        <Route path="/response" exact element={<Response/>}/>
        <Route path='*' exact element={<Error404/>} />
      </Routes>
    </BrowserRouter>
  );
}