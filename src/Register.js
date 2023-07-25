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
        password: ''
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

    const verifyEmail = () => {
        console.log('Verification Code in State:', verificationCode);
        
        // Get the verification code stored in state (authCode)
        const receivedVerificationCode = authCode;

        console.log('Recieved Verification code is', receivedVerificationCode);

        if (verificationCode === receivedVerificationCode) {
            // Verification successful

            // Clear the verification code from the state after successful verification
            setAuthCode('');

            // Redirect to the thank you page or any other page you like
            history(`/thankyou`);
        } else {
            // Verification failed
            alert('Invalid verification code. Please try again.');
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        const senddata = {
            name: data.name,
            email: data.email,
            company: data.company,
            url: data.url,
            password: data.password
        };

        axios.post('https://react.opositive.io/insert.php', senddata)
            .then((result) => {
                if (result.data.Status === 'Invalid') {
                    alert('Invalid User');
                } else {
                    // Send verification email upon successful registration
                    sendVerificationEmail();
                }
            })
            .catch((error) => {
                console.log('Error during registration:', error);
            });
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
                            <div>
                                <p>Please enter the verification code sent to your email:</p>
                                <input
                                    type="text"
                                    name="verificationCode"
                                    onChange={handleChangeVerificationCode}
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
