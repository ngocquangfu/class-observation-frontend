import React from 'react';
import './App.css';
import Footer from './views/components/Footer/Footer';
import Home from './views/pages/HomePage/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/pages/AutheticationPage/Login/Login';
import Admin from './views/pages/AutheticationPage/Admin/Home';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/login" exact element={<Login/>}/>
        <Route path="/admin" exact element={<Admin/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
export default App;