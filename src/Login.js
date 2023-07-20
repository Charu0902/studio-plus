import { useState } from "react";
import axios from 'axios';
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";

const Login = () =>{
    let navigate = useNavigate();
    const [user,setUser] = useState({email:'', password:''});
    const handleChange = (e) =>{
        setUser({...user, [e.target.name]:e.target.value});
    }
    const submitForm = (e) => {
        e.preventDefault();
       const senddata = {
        email: user.email,
            password: user.password
        }
        console.log(senddata);
        axios.post('https://react.opositive.io/login.php', senddata)
        .then((result) =>{
            if(result.data.status === "200" ){
               window.localStorage.setItem('email', result.data.email);
               window.localStorage.setItem('name', result.data.name);
            
                navigate(`/home`)
                console.log(result.data);

            }
            else{
                document.getElementById('invlaid-user').style.display = 'block';
                // alert('Invalid User');
                console.log(result.data);
            }

        })
    }
    return(
        <>
        <div className="container">
             <div className="row login-form-row">
               
                  <div className="col-lg-4 col-md-8 col-sm-12 login-form-div">
                  <div className="image-div">
                  <img src="./Assets/opositive-logo.png" className="img-fluid"/>
                  </div>
                  <div id="invlaid-user">
                     <p>Invalid user, <Link to='/register'>Register Now</Link></p>
                  </div>
                       <form onSubmit={submitForm} className="login-form">
                        <div className="col-md-12 login-input-div">
                            <label>Email</label>
                        <input type="email" name="email"className="form-control login-input" onChange={handleChange} value={user.email}/>

                        </div>
                        <div className="col-md-12 login-input-div">
                            <label>Password</label>
                            <input type="password" name="password"className="form-control login-input" onChange={handleChange} value={user.password}/>

                        </div>
                        <div className="col-md-12 submssion-div">
                        <Link to="/forget-password" class="submit-forget-link">Forget password</Link>
                          <input type="submit" name="submit" value='Login'/>
                        </div>
                       </form>
                       <div className="new-to-sudio">
                       <p>New to Studio+? <Link to='/register'>Join now</Link></p>
                       </div>
                  </div>
             </div>
        </div>
        </>
    )
}

export default Login;