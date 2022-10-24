import React from 'react';
import Home from '../views/pages/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../views/pages/authetication/login/Login';
import Admin from '../views/pages/authetication/admin/Admin';
import Lecture from '../views/pages/authetication/lecture/Lecture';
import Result from '../views/pages/authetication/lecture/result/Result';
import HeadSubject from '../views/pages/authetication/headSubject/HeadSubject';




function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/admin" exact element={<Admin/>}/>
        <Route path="/lecture" exact element={<Lecture/>}/>
        <Route path="/result" exact element={<Result/>}/>
        <Route path="/headSubject" exact element={<HeadSubject/>}/>

      </Routes>
    </BrowserRouter>
  );
}
export default Router;