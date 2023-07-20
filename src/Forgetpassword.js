import React from "react";
import axios from "axios";

function forgetPasswordmail(event){
  
    var bodyFormData = new FormData();
   let email = document.getElementById('email').value;
    
    //   let interest = selectedhome.toString();
  bodyFormData.append('email', email);
  
  
  axios({
    method: "post",
    url: "https://react.opositive.io/PHPMailer-master/studio-plus/forget-password-mail.php",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
  
     var sucess = document.getElementById('sucess');
     sucess.style.display = 'block';
     console.log('mail sent');  
    })
    .catch(function (response) {
      //handle error
      console.log(response);
    });
    event.preventDefault();
  }
const Forgetpassword = () =>{
    return(
        <>
        <div className="container">
             <div className="row login-form-row">
               
                  <div className="col-lg-4 col-md-8 col-sm-12 login-form-div">
                  <div className="image-div">
                  <img src="./Assets/opositive-logo.png" className="img-fluid"/>
                  </div>
                  <div id="sucess">
                    <p>Please check your mail id, for futher instructions.</p>
                  </div>
                       <form  className="login-form" onSubmit={forgetPasswordmail}>
                        <div className="col-md-12 login-input-div">
                            <label>Please enter your registered Email Address</label>
                        <input type="email" name="email" id = 'email' className="form-control login-input" />

                        </div>
    
                        <div className="col-md-12 submssion-div forget-password-submit">
                          <input type="submit" name="submit" value='Send Email'/>
                        </div>
                       </form>
                  </div>
             </div>
        </div>
        </>
    )
}

export default Forgetpassword;