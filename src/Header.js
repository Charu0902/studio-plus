import React, { useEffect } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () =>{
  const [auth, setAuth] = useState();
  const [name, setname] = useState();
  let navigate = useNavigate();
useEffect(() =>{
  var name = localStorage.getItem('name');

setname(name);
},
[])
    return(
        <>
        <nav class="navbar navbar-expand-sm studio-nav">
  <div class="container-fluid nav-container">
    <Link class="navbar-brand logo-pic" to="/">                  <img src="../Assets/opositive-logo.png" className="img-fluid"/>
</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar" id="button-header">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav ">
      
        <li class="nav-item welcome">
          <span>Welcome</span> : {name}
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/"><i class="fa fa-user" aria-hidden="true"></i>
Logout</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </>
    )
}

export default Header;