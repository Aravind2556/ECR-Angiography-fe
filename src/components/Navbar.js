import React, { useContext } from 'react';

import { DContext } from '../context/Datacontext';



const Navbar = () => {
  
  const apiurl = process.env.REACT_APP_API_URL
  const {Auth}= useContext(DContext)
  console.log("Auth By navbar",Auth)


  function isLogout() {
    fetch(`${apiurl}/logout`, {
      method: "GET",
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message)
        if (data.success === true) {
          window.location.href='/'
        }
      })
      .catch(err => {
        console.log("Logout deFetching error", err)
      })
  }

 
  return (
    <nav className="navbar navbar-expand-lg navbar-light text-primary sticky-top border-bottom bg-light">
      <div className="container">
        {/* Logo / Brand */}

      
        <a className=" fw-bold text-primary px-2 text-decoration-none " href="/">
        Non-Invasive Coronary Blockage Detection System
        </a> 
       

        
        <button className="btn btn-dark" onClick={isLogout}>{Auth === null  ? 'Login' : 'Logout' }</button>
       
        

      </div>
    </nav>
  );
};

export default Navbar;
