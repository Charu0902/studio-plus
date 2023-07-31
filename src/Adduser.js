import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Adduser = () => {
  let history = useNavigate();
  // Initialize state variables using the useState hook

  const [user, setUser] = useState({
    name: "",
    email: "",
    company: "",
    url: "",
    password: "",
    iframe: "",
    gaChecked: false,
    gscChecked: false,
    gmbChecked:false,
    gadsChecked:false,
  });

  // Destructure state variables for easier access

  const { name, email, company, url, password, iframe, gaChecked, gscChecked, gmbChecked, gadsChecked} = user;

  // Handle change events for input fields and update state accordingly

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle change event for GA checkbox and update state accordingly

  const handleGaChange = (e) => {
    setUser({ ...user, gaChecked: e.target.checked });
  };

  // Handle change event for GSC checkbox and update state accordingly

  const handleGscChange = (e) => {
    setUser({ ...user, gscChecked: e.target.checked });
  };

    // Handle change event for GMB checkbox and update state accordingly

    const handleGmbChange = (e) => {
      setUser({ ...user, gmbChecked: e.target.checked });
    };

      // Handle change event for Google Ads checkbox and update state accordingly

    const handleGadsChange = (e) => {
      setUser({ ...user, gadsChecked: e.target.checked });
    };

      // Handle form submission

  const submitUser = async (e) => {
    e.preventDefault();
    console.log(user);
        // Convert checkbox values to '1' or '0' to store in the database

    const userData = {
      ...user,
      ga: user.gaChecked ? '1' : '0',
      gsc: user.gscChecked ? '1' : '0',
      gmb: user.gmbChecked ? '1' : '0',
      gads: user.gadsChecked ? '1' : '0'
    };
    console.log(userData);
    try {
            // Send a POST request to the backend API to add the user

      const response = await axios.post('http://react.opositive.io/add-user.php', userData);
            // Handle the response based on the status received

      if (response.data.status === 'Invalid') {
        alert('Invalid User');
      } else {
                // If user added successfully, display success message and navigate to home page

        var useradded = document.getElementById('success');
        useradded.style.display = 'block';
        setTimeout(() => {
          history(`/home`);
        }, 3000);
      }
    } catch (error) {
      console.error('Error while submitting user:', error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="heading">Add User</h1>
        <p id="success">User Added Successfully!</p>
        <div className="row add-user-row">
          <form onSubmit={(e) => submitUser(e)}>
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 col-md-12 register-form-col">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-12 register-form-col">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="form-control"
                    value={email}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12 register-form-col">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="company"
                    className="form-control"
                    value={company}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-12 register-form-col">
                  <label>Website Url</label>
                  <input
                    type="url"
                    name="url"
                    required
                    className="form-control"
                    value={url}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-md-12 register-form-col">
                  <label>Iframe</label>
                  <textarea
                    name="iframe"
                    required
                    className="form-control"
                    value={iframe}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
                <div className="col-lg-6 col-md-12 register-form-col">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    autoComplete="on"
                    value={password}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <br />
              <b>Select required reports</b>
              <div className="col-lg-9 col-md-12 register-form-col">
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
              <div className="col-lg-6 col-md-12 text-left register-button">
                <input
                  type="submit"
                  name="submit"
                  value="Add User"
                  className="btn btn-success"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Adduser;
