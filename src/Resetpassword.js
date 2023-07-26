import React, { useState } from "react";
import axios from 'axios';

const Resetpassword = () => {
  const [newPassword, setNewPassword] = useState('');

  const handleChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Call a function to update the password in the database
    updatePassword(newPassword);
  };

  const updatePassword = (newPassword) => {
    // Get the verification code from the session data
    const verificationCode = sessionStorage.getItem('verification');
console.log('reset password verification code' + verificationCode);
const email = sessionStorage.getItem('email');
console.log('reset password verification code' + email);
console.log('Email:', email);
console.log('New Password:', newPassword);

    // Make an API call to update the password in the database
    axios.post('https://react.opositive.io/update-password.php', {
      newPassword,
      email
    })
    .then(function (response) {
      if (response.data.status === 'valid') {
        var success = document.getElementById('sucess');
        success.style.display = 'block';
        // Password update was successful
        console.log('Password updated successfully');
      } else {
        // Password update failed
        var failure = document.getElementById('failure');
        failure.style.display = 'block';
        console.log('Password update failed');
      }
    })
    .catch((error) => {
      console.log('Error updating password:', error);
    });
  };

  return (
    <>
      <div className="container">
        <div className="row login-form-row">
          <div className="col-lg-4 col-md-8 col-sm-12 login-form-div">
            <div className="image-div">
              <img src="./Assets/opositive-logo.png" className="img-fluid" />
            </div>
            <div id="sucess">
                    <p>Password updated successfully!</p>
                  </div>
                  <div id="failure">
                    <p>
                        Password update failed , please try again. 
                    </p>
                  </div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="col-md-12 login-input-div">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="form-control login-input"
                  value={newPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-12 submssion-div forget-password-submit">
                <input type="submit" name="submit" value='Submit' />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Resetpassword;
