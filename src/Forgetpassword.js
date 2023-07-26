import React, { useState } from "react";
import axios from "axios";

const Forgetpassword = () =>{
  const [data, setData] = useState({
    email: ''
  
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
};
const generateRandomCode = (length = 6) => {
  const characters = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
      code += characters[Math.floor(Math.random() * characters.length)];
  }
  return code;
};
const [authCode, setAuthCode] = useState('');

  const forgetPasswordmail = (event) =>{
    
    const { email } = data;
    const generatedAuthCode = generateRandomCode();

    axios.post("https://react.opositive.io/PHPMailer-master/studio-plus/forget-password-mail.php", { email, authCode: generatedAuthCode })
        .then(function (response) {
         
            if (response.data.status === 'valid') {
              var success = document.getElementById('sucess');
                success.style.display = 'block';
                console.log('Mail sent');
                setAuthCode(generatedAuthCode);
                // setVerificationCodeInputVisible(true);
            } else if (response.data.status === 'invalid') {
                // Handle the case where the email is not registered
                // For example, you can display an error message on the frontend
                console.log(response.data.error);
            }
        })
        .catch(function (error) {
            // Handle other errors
            console.log(error);
        });

    event.preventDefault();
     
    }
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
                        <input type="email" name="email" id = 'email' className="form-control login-input" onChange={handleChange} value={data.email}/>

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