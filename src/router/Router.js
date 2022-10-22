import React from 'react';
import Footer from '../views/components/footer/Footer';
import Home from '../views/pages/home/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../views/pages/authetication/login/Login';
import Admin from '../views/pages/authetication/admin/Index';
import Lecture from '../views/pages/authetication/lecture/Index';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/admin" exact element={<Admin/>}/>
        <Route path="/lecture" exact element={<Lecture/>}/>
        


      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
export default Router;