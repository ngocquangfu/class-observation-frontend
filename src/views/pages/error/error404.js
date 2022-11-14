import React from 'react'
import './error404.css'
import NavBar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

function error404() {
  return (
    <>
    <NavBar/>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Oops! This Page Could Not Be Found</h2>
          <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
          <a href="/">Go To Homepage</a>
        </div>
      </div>

    <Footer/>

    </>
  )
}

export default error404