import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = (props) => {
    const history = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        company: '',
        url: '',
        password: '',
        gaChecked: false,
        gscChecked: false,
        gmbChecked:false,
        gadsChecked:false
    });
    const { gaChecked, gscChecked, gmbChecked, gadsChecked} = data;
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    const handleGaChange = (e) => {
        setData({ ...data, gaChecked: e.target.checked });
      };
    
      const handleGscChange = (e) => {
        setData({ ...data, gscChecked: e.target.checked });
      };
        const handleGmbChange = (e) => {
            setData({ ...data, gmbChecked: e.target.checked });
        };
        const handleGadsChange = (e) => {
            setData({ ...data, gadsChecked: e.target.checked });
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
        const { name, email } = data;
      
        // Generate the verification code
        const generatedAuthCode = generateRandomCode();

        // Send the verification code along with the user's email to the backend
        axios.post('https://react.opositive.io/PHPMailer-master/studio-plus/send_verification_email.php', { name, email, authCode: generatedAuthCode })
            .then((response) => {
                console.log('Verification email sent');

                // Save the authentication code to the state for verification later
                setAuthCode(generatedAuthCode);

                // Show the verification input field
                setVerificationCodeInputVisible(true);
            })
            .catch((error) => {
                console.log('Error sending verification email:', error);
            });
    };
    const sendAccessRequestEmail = () => {
        const { name, email, gaChecked, gscChecked, gmbChecked, gadsChecked } = data;
    
        // Prepare the email content based on the selected reports
        let emailContent = `Dear ${name},<br><br>`;
    
        if (gaChecked) {
            emailContent += "Please provide access for Google Analytics (GA).<br>";
        }
        if (gscChecked) {
            emailContent += "Please provide access for Google Search Console (GSC).<br>";
        }
        if (gmbChecked) {
            emailContent += "Please provide access for Google Buisness Profile (GMB).<br>";
        }
        if (gadsChecked) {
            emailContent += "Please provide access for Google Ads (GADS).<br>";
        }
        // Add similar conditions for other reports (gmbChecked, gadsChecked) if needed.
    
        emailContent += "<br>Regards,<br>Obbserv";
    // console.log('Email content is' + emailContent);
    // console.log('Client name is' + name);
    // console.log('Client email is' + email);
        axios.post('https://react.opositive.io/PHPMailer-master/studio-plus/send_email_to_client.php', { name, email, content: emailContent })
            .then((response) => {
                console.log('Access request email sent');
            })
            .catch((error) => {
                console.log('Error sending access request email:', error);
            });
    };
    
    const verifyEmail = () => {
      console.log('Verification Code in State:', verificationCode);
      
      // Get the verification code stored in state (authCode)
      const receivedVerificationCode = authCode;
  
      console.log('Received Verification code is', receivedVerificationCode);
  
      if (verificationCode === receivedVerificationCode) {
          // Verification successful
  
          // Clear the verification code from the state after successful verification
          setAuthCode('');
          const senddata = {
              name: data.name,
              email: data.email,
              company: data.company,
              url: data.url,
              password: data.password,
              ga: data.gaChecked ? '1' : '0',
              gsc: data.gscChecked ? '1' : '0',
              gmb: data.gmbChecked ? '1' : '0',
              gads: data.gadsChecked ? '1' : '0'
          };
          console.log(senddata);
       axios.post('https://react.opositive.io/register-client.php', senddata)
              .then((result) => {
                  if (result.data.Status === '400') {
                      alert('Invalid User');
                  } else {
                      // Send verification email upon successful registration
                      console.log('User Registered');
                      // Now, send the email message
                      const email = data.email;
                      const name = data.name;
                      axios.post('https://react.opositive.io/PHPMailer-master/studio-plus/register.php', { email, name })
                          .then((response) => {
                              console.log('Email sent');
                              // Redirect to the thank you page or any other page you like
                              history(`/thankyou`);
                          })
                          .catch((error) => {
                              console.log('Error sending email:', error);
                              // Redirect to the thank you page or any other page you like
                              history(`/thankyou`);
                          });
                  }
              })
              .catch((error) => {
                  console.log('Error during registration:', error);
              });
              sendAccessRequestEmail();

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
                <div className="row register-row">
                    <div className="col-md-6 col-sm-12">
                        <img src="./Assets/loginimg.jpg" className="img-fluid" alt="Login" />
                    </div>
                    <div className="col-md-6 col-sm-12">
                        {verificationCodeInputVisible ? (
                            <div className="verification-div">
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
                            <form onSubmit={submitForm} className="register-form">
                                <div className="col-md-12 register-form-col">
                                    <label>Name</label>
                                    <input type="text" name='name' id="name" className="form-control" onChange={handleChange} value={data.name} required />
                                </div>

                                <div className="col-md-12 register-form-col">
                                    <label>Email</label>
                                    <input type="email" name='email' required className="form-control" id="email" onChange={handleChange} value={data.email} />
                                </div>

                                <div className="col-md-12 register-form-col">
                                    <label>Company Name</label>
                                    <input type="text" name='company' className="form-control" onChange={handleChange} value={data.company} />
                                </div>

                                <div className="col-md-12 register-form-col">
                                    <label>Website Url</label>
                                    <input type="url" name='url' required className="form-control" onChange={handleChange} value={data.url} />
                                </div>

                                <div className="col-md-12 register-form-col">
                                    <label>Password</label>
                                    <input type="password" name='password' required className="form-control" onChange={handleChange} value={data.password} autoComplete="on" />
                                </div>
                                <br />
              <b>Select required reports</b>
              <div className="col-lg-12 col-md-12 register-form-col">
                <div className="row access-row">
                  <div className="col-lg-3 col-sm-12 access-required">
                    <label>GA</label>
                    <input
                      type="checkbox"
                      name="ga"
                      checked={gaChecked}
                      onChange={handleGaChange}
                    />
                  </div>
                  <div className="col-lg-3 col-sm-12 access-required">
                    <label>GSC</label>
                    <input
                      type="checkbox"
                      name="gsc"
                      checked={gscChecked}
                      onChange={handleGscChange}
                    />
                  </div>
                  <div className="col-lg-3 col-sm-12 access-required">
<label>GMB</label>
  <input
    type="checkbox"
    name="gmb"
    checked={gmbChecked}
    onChange={handleGmbChange}
  />
</div>
<div className="col-lg-3 col-sm-12 access-required">
<label>Google Ads</label>
  <input
    type="checkbox"
    name="gads"
    checked={gadsChecked}
    onChange={handleGadsChange}
  />
</div>
                </div>
              </div>
                                <div className="col-md-12 text-left register-button">
                                    <input type="submit" name='submit' value='Register' className="btn btn-success" />
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;