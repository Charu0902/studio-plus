import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
// import {Helmet} from "react-helmet";

const Dcompo = () =>{
    let history = useNavigate();
    const {slug} = useParams();
    const [user, setUser] = useState({
        slug:"",
        iframe_ga: "",
        website: ""
        
    });
    useEffect(() =>{
        
        loadUsers();
       
    },[])
    const {iframe_ga,website} = user

    const loadUsers = async ()=>{
        console.log('AA'+slug);
        const result = await axios.get('https://react.opositive.io/show-client-report.php?slug='+slug)
     
        setUser(result.data);
        var load = document.getElementById('loadingMessage');
        load.style.display = 'none';
    }
   
    return(
        <>
      <div id="loadingMessage">
      <img src="./Assets/voiceloader.gif" className="img-fluid"/>

      </div>
      <section className="clinet-dashboard">
       <div className="container-fluid">
       <div className="row client-dahboard-row">
          <div className="col-lg-2 col-md-4 sideboard">
          <input type="text" id="myInput1" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name"/>
          <ul className="report-list">
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i> Report 1</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i> Report 2</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i> Report 3</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i> Report 4</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i> Report 5</li>
            <li><i class="fa fa-chevron-right" aria-hidden="true"></i> Report 6</li>
          </ul>
          </div>
         
          <div className="col-lg-10 col-md-8 list-reports">
            <div className="row">
               <div className="col-md-6 col-sm-12">
               <b>Iframe link -</b>
               <p>{iframe_ga}</p>
               </div>
               <div className="col-md-6 col-sm-12">
               <b>Website url -</b>
               <p>{website}</p>
               </div>
            </div>
          <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-12">
             <div className="report-card">
              <img src="./Assets/gmb.webp"/>
          {/* <h2>Report 1</h2> */}
             </div>
          
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
             <div className="report-card">
             <img src="./Assets/gads.webp"/>
          {/* <h2>Report 2</h2> */}
             </div>
          
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
             <div className="report-card">
             <img src="./Assets/gsc.webp"/>
          {/* <h2>Report 3</h2> */}
             </div>
          
          </div>
          <div className="col-lg-3 col-md-6 col-sm-12">
             <div className="report-card">
             <img src="./Assets/ga.webp"/>
          {/* <h2>Report 4</h2> */}
             </div>
          
          </div>
          </div>
          </div>
       </div>
       </div>
      </section>
        </>
    )
}

export default Dcompo;