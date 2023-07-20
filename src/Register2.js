import React, { useState } from "react";
import SignUpInfo from "./SignUpInfo";
import PersonalInfo from "./PersonalInfo";
import OtherInfo from "./OtherInfo";
import axios from 'axios';
import { Navigate, useNavigate } from "react-router-dom";
const Register2 = (props) =>{
    const [page, setPage] = useState(0);
    const [formdata, setFromData] = useState(
      {
        name: "",
        email: "",
        companyName: "",
        websiteurl: "",
        password: "",
        ga: "",
        gsc: "",
        gmb: "",
        googleads: "",
    }
    );
    const FormTitles = ["Personal Details", "Select Report"];

    const PageDisplay = () =>{
        if (page === 0){
            return <SignUpInfo formdata = {formdata} setFromData= {setFromData}/>
        }
        else{
            return <PersonalInfo formdata = {formdata} setFromData= {setFromData}/>
        }
      
    }
    const submitForm = (e) => {
        e.preventDefault();
       const senddata = {
        name : formdata.name,
        email: formdata.email,
        companyName: formdata.companyName,
        websiteurl: formdata.websiteurl,
        password: formdata.password,
        ga: formdata.ga,
        gsc: formdata.gsc,
        gmb: formdata.gmb,
        googleads: formdata.googleads,

        }
        console.log(senddata);
     axios.post('http://react.opositive.io/studio.php', senddata)
        .then((result) =>{
            if(result.data.Status == 'Invalid'){
                alert('Invalid User');
            }
            else{
                console.log('Valid');
            }

        })
    }
    return(
        <>
<div className="container">
<div className="row">
  <div className="col-md-6 col-sm-12">
  <img src="./Assests/loginimg.jpg" className="img-fluid"/>

  </div>
  <div className="col-md-6 col-sm-12">
  <div className="form">
    <div className="progressbar">
       <div style={{ width: page === 0 ? "50.0%" : "100%" }}></div>
    </div>
    <div className="form-container">
         <div className="header">
            <h1>{FormTitles[page]}</h1>
         </div>
         <form onSubmit={submitForm}>
         <div className="body">
           
           {PageDisplay() }
         </div>
         <div className="footer">
                            <button disabled = {page == 0}    
                            onClick={() => {setPage((currPage) => currPage - 1)}}>Prev</button>
                            <button
            onClick={() => {
              if (page === FormTitles.length - 1) {
                alert("FORM SUBMITTED");
                console.log(formdata);
                window.location.href = '/home';
              } else {
                setPage((currPage) => currPage + 1);
              }
            }}
          >
            {page === FormTitles.length - 1 ? "Submit" : "Next"}
          </button>

         </div>
         </form>

       </div>
</div>
  </div>
</div>
</div>
        </>
    )
}

export default Register2;