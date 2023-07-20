import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import {Helmet} from "react-helmet";

const Dcompo = () =>{
    let history = useNavigate();
    const {slug} = useParams();
    const [user, setUser] = useState({
        name:"",
        email: "",
        company: "",
        url:"",
        password:"",
        id:"",
        iframe:"",
        slug:""
    });
    useEffect(() =>{
        
        loadUsers();
       
    },[])
    const {name,email,company,url,iframe} = user
    // const handleChange =(e)=>{
    //     setUser({...user,[e.target.name]: e.target.value})
    // }
    // const updateFrom = async(e) =>{
    //     e.preventDefault();
    //     console.log(user);

    //     await axios.post('https://react.opositive.io/update.php',user)
    //     .then((result) =>{
    //         if(result.data.Status == 'Invalid'){
    //             alert('Invalid User');
    //         }
    //         else{
    //             var useradded = document.getElementById('success');
    //             useradded.style.display = 'block';
    //           setTimeout(() =>{
    //             history(`/home`)
    //           },3000)
    //         }

    //     })
    // }

    const loadUsers = async ()=>{
        console.log('AA'+slug);
        const result = await axios.get('https://react.opositive.io/view.php?slug='+slug)
     
        setUser(result.data);
        var load = document.getElementById('loadingMessage');
        load.style.display = 'none';
    }
   
    return(
        <>
        <Helmet>
                <meta charSet="utf-8" />
                <title>{company} Powered by Studio+</title>
            </Helmet>
      {/* <div className="container">
      <h1 className="heading">View User</h1>
        <p id="success">User Upadted Successfully!</p>
      <div className="row edit-user-row"> */}
        {/* <form onSubmit={e => updateFrom(e)}> */}

        {/* <div className="col-lg-6 col-md-12 register-form-col"> 
      <label >Name</label> - <p>{name}</p>
      </div>

    
      <div className="col-lg-6 col-md-12 register-form-col"> 
      <label>Email</label>-
      <p>{email}</p>
      </div>
      
      <div className="col-lg-6 col-md-12 register-form-col"> 
      <label>Company Name</label>-
      <p>{company}</p>
       
      </div>
   
      <div className="col-lg-6 col-md-12 register-form-col"> 
      <label>Website Url</label>-
      <p>
      <a href={url}>{url}</a>
      </p>
        
      </div>
     
     */}
      
      
       {/* <div className="col-lg-6 col-md-12 text-left register-button">
           <input type="submit" name = 'submit' value='Update User' className="btn btn-success"/>
       </div> */}
       {/* </form> */}
        {/* </div>
      </div> */}
      <div id="loadingMessage">
      <img src="./Assets/voiceloader.gif" className="img-fluid"/>

      </div>
      <section>
      {/* <h2 className="heading">View report</h2> */}

      <iframe  src={iframe} height='1600' allowfullscreen className="user-iframe" id="foo"></iframe>
      </section>
        </>
    )
}

export default Dcompo;