import React from "react";


const Resetpassword = () =>{
    return(
        <>
          <div className="container">
             <div className="row login-form-row">
               
                  <div className="col-lg-4 col-md-8 col-sm-12 login-form-div">
                  <div className="image-div">
                  <img src="./Assets/opositive-logo.png" className="img-fluid"/>
                  </div>
                       <form  className="login-form">
                        <div className="col-md-12 login-input-div">
                            <label>Password</label>
                        <input type="password" name="password" className="form-control login-input" />

                        </div>
    
                        <div className="col-md-12 submssion-div forget-password-submit">
                          <input type="submit" name="submit" value='Submit'/>
                        </div>
                       </form>
                  </div>
             </div>
        </div>
        </>
    )
}

export default Resetpassword;