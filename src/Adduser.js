import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Adduser = () => {
  let history = useNavigate();

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

  const { name, email, company, url, password, iframe, gaChecked, gscChecked, gmbChecked, gadsChecked} = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleGaChange = (e) => {
    setUser({ ...user, gaChecked: e.target.checked });
  };

  const handleGscChange = (e) => {
    setUser({ ...user, gscChecked: e.target.checked });
  };
    const handleGmbChange = (e) => {
      setUser({ ...user, gmbChecked: e.target.checked });
    };
    const handleGadsChange = (e) => {
      setUser({ ...user, gadsChecked: e.target.checked });
    };
  const submitUser = async (e) => {
    e.preventDefault();
    console.log(user);
    const userData = {
      ...user,
      ga: user.gaChecked ? '1' : '0',
      gsc: user.gscChecked ? '1' : '0',
      gmb: user.gmbChecked ? '1' : '0',
      gads: user.gmbChecked ? '1' : '0'
    };
    console.log(userData);
    try {
      const response = await axios.post('http://react.opositive.io/add-user.php', userData);
      if (response.data.status === 'Invalid') {
        alert('Invalid User');
      } else {
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
              <b>Access recieved?</b>
              <div className="col-lg-6 col-md-12 register-form-col">
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
