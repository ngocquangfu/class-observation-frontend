import React from 'react';
import './App.css';
import NavBar from './views/pages/HomePage/Navbar';
import Home from './views/pages/HomePage/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './views/pages/AutheticationPage/Login/Login';



function App() {
  return (
    <BrowserRouter>
       <NavBar/>

      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/login" exact element={<Login/>}>
        </Route>
       
      </Routes>
    </BrowserRouter>
  );
}
export default App;