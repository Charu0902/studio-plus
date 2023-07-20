import React, { useEffect } from "react";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import Listpage from "./Listpage";
import $ from "jquery";

const Home = () =>{
    const [auth, setAuth] = useState();
    let navigate = useNavigate();
     useEffect(() =>{
        var auth = localStorage.getItem('email');
        setAuth(auth);
     },
     [])
    if(auth === null){
        navigate(`/`)
      }
    return(
        <>
         <div className="container-fluid">
            <div className="row dashboard-row">
                <div className="col-lg-2 col-md-12 col-sm-12 dashboard-section">
                <p><i class="fa fa-th-large" aria-hidden="true"></i>Dashboard</p>
                </div>
               <div className="col-lg-10 col-md-12 col-sm-12">
        <Listpage/>
               </div>
            </div>
         </div>
        </>
    )
}

export default Home;