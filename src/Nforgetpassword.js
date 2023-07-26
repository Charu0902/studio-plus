import React, { useState } from "react";
import axios from 'axios';
import { useNavigate,Link } from "react-router-dom";

const Nforgetpassword = (props) => {
    const history = useNavigate();
    const [data, setData] = useState({
        email: ''
      
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const [verificationCode, setVerificationCode] = useState('');
    const [verificationCodeInputVisible, setVerificationCodeInputVisible] = useState(false);

    const handleChangeVerificationCode = (e) => {
        setVerificationCode(e.target.value);
    };

    const generateRandomCode = (length = 6) => {
        const characters = '0123456789';
        let code = '';
        for (let i = 0; i < length; i++) {
            code += characters[Math.floor(Math.random() * characters.length)];
        }
        return code;
    };

    // Store the verification code in component state
    const [authCode, setAuthCode] = useState('');

    const sendVerificationEmail = () => {
        const { email } = data;
      
        // Generate the verification code
        const generatedAuthCode = generateRandomCode();

        // Send the verification code along with the user's email to the backend
        axios.post('https://react.opositive.io/PHPMailer-master/studio-plus/forget-password-mail.php', {  email, authCode: generatedAuthCode })
        .then(function (response) {
         
            if (response.data.status === 'valid') {
              var success = document.getElementById('sucess');
                success.style.display = 'block';
                console.log('Mail sent');
                setAuthCode(generatedAuthCode);
                setVerificationCodeInputVisible(true);
                sessionStorage.setItem('authCode', generatedAuthCode);
                sessionStorage.setItem('email',email);
            } else if (response.data.status === 'invalid') {
                var failure = document.getElementById('failure');
                failure.style.display = 'block';
                // Handle the case where the email is not registered
                // For example, you can display an error message on the frontend
                console.log(response.data.error);
            }
        })
            .catch((error) => {
                console.log('Error sending verification email:', error);
            });
    };

    const verifyEmail = () => {
      console.log('Verification Code in State:', verificationCode);
      
      // Get the verification code stored in state (authCode)
      const receivedVerificationCode = authCode;
      sessionStorage.setItem("verification", verificationCode);

      let verification = sessionStorage.getItem("verification");

      console.log('Session storage verification code is', receivedVerificationCode);
  
      if (verificationCode === receivedVerificationCode) {
          // Verification successful
  
          // Clear the verification code from the state after successful verification
          setAuthCode('');
  
          history(`/reset-password`);
      } else {
          // Verification failed
          alert('Invalid verification code. Please try again.');
      }
  };
  

    const submitForm = (e) => {
        e.preventDefault();
        sendVerificationEmail();
    
    };
  
    return (
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
                  <div id="failure">
                    <p>
                        Email not registered ,<Link to='/register'>Register Now</Link> 
                    </p>
                  </div>
                  {verificationCodeInputVisible ? (
                            <div className="verification-div forget-password-verification-div">
                                <p>Please enter the verification code sent to your email:</p>
                                <input
                                    type="text"
                                    name="verificationCode"
                                    onChange={handleChangeVerificationCode}
                                    className="form-control"
                                />
                                <button onClick={verifyEmail}>Verify</button>
                            </div>
                        ) : (
                       <form  className="login-form" onSubmit={submitForm}>
                        <div className="col-md-12 login-input-div">
                            <label>Please enter your registered Email Address</label>
                        <input type="email" name="email" id = 'email' className="form-control login-input" onChange={handleChange} value={data.email}/>

                        </div>
    
                        <div className="col-md-12 submssion-div forget-password-submit">
                          <input type="submit" name="submit" value='Send Email'/>
                        </div>
                       </form>
                        )}
                  </div>
             </div>
        </div>
        </>
    );
}

export default Nforgetpassword;