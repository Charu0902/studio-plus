import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edituser = () => {
        // Use the useNavigate hook from react-router-dom to get the navigation function

    let history = useNavigate();

        // Use the useParams hook from react-router-dom to get the 'id' parameter from the URL

    const { id } = useParams();

        // Set the initial state for the user data using the useState hook

    const [user, setUser] = useState({
        name: "",
        email: "",
        url: "",
        password: "",
        slug: "",
        iframe: "",
        id: "",
        gaChecked: false,
        gscChecked: false,
        gmbChecked: false,
        gadsChecked: false,
    });

    useEffect(() => {
        loadUsers();
    }, []);

        // Destructure the user state object for easier access to its properties

    const { name, email, url, password, slug, iframe, gaChecked, gscChecked, gmbChecked, gadsChecked } = user;

        // Handle input change for text fields (name, email, url, password, slug, and iframe)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
        // Handle checkbox change for GA (Google Analytics) access


    const handleGaChange = (e) => {
        setUser({ ...user, gaChecked: e.target.checked });
    };
    // Handle checkbox change for GSC (Google Search Console) access

    const handleGscChange = (e) => {
        setUser({ ...user, gscChecked: e.target.checked });
    };
    // Handle checkbox change for GMB (Google My Business) access

    const handleGmbChange = (e) => {
        setUser({ ...user, gmbChecked: e.target.checked });
    };
    // Handle checkbox change for Google Ads access

    const handleGadsChange = (e) => {
        setUser({ ...user, gadsChecked: e.target.checked });
    };
    // Handle form submission to update the user data

    const updateFrom = async (e) => {
        e.preventDefault();
        console.log(user);

         // Convert checkbox values (gaChecked, gscChecked, gmbChecked, gadsChecked) to '1' or '0'

        const userData = {
            ...user,
            ga: user.gaChecked ? '1' : '0',
            gsc: user.gscChecked ? '1' : '0',
            gmb: user.gmbChecked ? '1' : '0',
            gads: user.gadsChecked ? '1' : '0',
        };
        console.log(userData);

        try {
            // Send a POST request to the backend API to update the user data

            await axios.post('https://react.opositive.io/update.php', userData);
               // Show success message and navigate to the home page after a delay
            var useradded = document.getElementById('success');
            useradded.style.display = 'block';
            setTimeout(() =>{
              history(`/home`)
            },3000)
        } catch (error) {
            console.error("Error updating user:", error);
            alert('Failed to update user. Please try again.');
        }
    };

        // Load the user data from the backend API 
    const loadUsers = async () => {
        console.log('AA' + id);
        try {
                // Send a GET request to the backend API to get the user data based on the 'id'
            const result = await axios.get('https://react.opositive.io/edit.php?id=' + id);
             // Extract the user data from the API response
            const userFromServer = result.data;
               // Set the user state with the fetched user data and convert checkbox values to booleans

            setUser({
                ...userFromServer,
                gaChecked: userFromServer.ga === '1',
                gscChecked: userFromServer.gsc === '1',
                gmbChecked: userFromServer.gmb === '1',
                gadsChecked: userFromServer.gads === '1',
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    // Check if any checkbox is checked
    const isAnyCheckboxChecked = () => {
        return gaChecked || gscChecked || gmbChecked || gadsChecked;
      };
          // Check if all checkboxes are checked

      const areAllCheckboxesChecked = () => {
        return gaChecked && gscChecked && gmbChecked && gadsChecked;
      };
    return (
        <>
            <div className="container">
                <h1 className="heading">Edit User</h1>
                <p id="success">User Updated Successfully!</p>
                <div className="row edit-user-row">
                <form onSubmit={e => updateFrom(e)}>

<div className="col-lg-12">
<div className="row">
<div className="col-lg-6 col-md-12 register-form-col"> 
<label >Name</label>
<input type="text"  name='name' className="form-control" value={name} onChange={e => handleChange(e)}/>
</div>


<div className="col-lg-6 col-md-12 register-form-col"> 
<label>Email</label>
<input type="email"  name='email' required className="form-control" value={email} onChange={e => handleChange(e)}/>
</div>
</div>

<div className="row">
<div className="col-lg-6 col-md-12 register-form-col"> 
<label>Website Url</label>
<input type="url"  name='url' required className="form-control" value={url} onChange={e => handleChange(e)}/>
</div>
<div className="col-lg-6 col-md-12 register-form-col"> 
<label>Iframe</label>
<textarea  name='iframe' required className="form-control" value={iframe} onChange={e => handleChange(e)}/>
</div>
</div>

<div className="row">
<div className="col-lg-6 col-md-12 register-form-col"> 
<label>Slug</label>
<input type="text"  name='slug' required className="form-control" value={slug} onChange={e => handleChange(e)}/>
</div>

<div className="col-lg-6 col-md-12 register-form-col"> 
<label>Password</label>
<input type="password"  name='password' required className="form-control"  autoComplete="on" value={password} onChange={e => handleChange(e)}/>
</div>
</div>
<br />
{!isAnyCheckboxChecked() && (
              <>
                <b>Reports access recived</b>
                <div className="col-lg-9 col-md-12 register-form-col">
                  <p>No reports access recieved.</p>
                </div>
              </>
            )}
            {isAnyCheckboxChecked() && (
              <>
                <b>Reports Access recieved</b>
                <div className="col-lg-6 col-md-12 register-form-col">
                  <div className="row access-row">
                    {/* Render the checkbox only if the corresponding value is checked */}
                    {gaChecked && (
                      <div className="col-lg-3 col-sm-12 access-required">
                        <label>GA</label>
                        <input
                          type="checkbox"
                          name="ga"
                          checked={gaChecked}
                          onChange={handleGaChange}
                        />
                      </div>
                    )}
                    {gscChecked && (
                      <div className="col-lg-3 col-sm-12 access-required">
                        <label>GSC</label>
                        <input
                          type="checkbox"
                          name="gsc"
                          checked={gscChecked}
                          onChange={handleGscChange}
                        />
                      </div>
                    )}
                    {gmbChecked && (
                      <div className="col-lg-3 col-sm-12 access-required">
                        <label>GMB</label>
                        <input
                          type="checkbox"
                          name="gmb"
                          checked={gmbChecked}
                          onChange={handleGmbChange}
                        />
                      </div>
                    )}
                    {gadsChecked && (
                      <div className="col-lg-3 col-sm-12 access-required">
                        <label>Google Ads</label>
                        <input
                          type="checkbox"
                          name="gads"
                          checked={gadsChecked}
                          onChange={handleGadsChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
                <br/>
              
                {!areAllCheckboxesChecked() && (
              <>
                <b>Add New Report</b>
                <div className="col-lg-6 col-md-12 register-form-col">
                  <div className="row access-row">
                    {/* Display the unselected reports */}
                    {!gaChecked && (
                      <div className="col-lg-3 col-sm-12 access-required">
                        <label>GA</label>
                        <input
                          type="checkbox"
                          name="ga"
                          checked={gaChecked}
                          onChange={handleGaChange}
                        />
                      </div>
                    )}
                    {!gscChecked && (
                      <div className="col-lg-3 col-sm-12 access-required">
                        <label>GSC</label>
                        <input
                          type="checkbox"
                          name="gsc"
                          checked={gscChecked}
                          onChange={handleGscChange}
                        />
                      </div>
                    )}
                    {!gmbChecked && (
                      <div className="col-lg-3 col-sm-12 access-required">
                        <label>GMB</label>
                        <input
                          type="checkbox"
                          name="gmb"
                          checked={gmbChecked}
                          onChange={handleGmbChange}
                        />
                      </div>
                    )}
                    {!gadsChecked && (
                      <div className="col-lg-3 col-sm-12 access-required">
                        <label>Google Ads</label>
                        <input
                          type="checkbox"
                          name="gads"
                          checked={gadsChecked}
                          onChange={handleGadsChange}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
<div className="col-lg-6 col-md-12 text-left register-button">
<div className="row edit-user-submit">
 <div className="col-lg-4 col-md-12">
 <input type="submit" name = 'submit' value='Update User' className="btn btn-success"/>
 </div>
 <div className="col-lg-4 col-md-12">
 <Link to='/home'>
  <button className="cancel">
    Cancel
   </button>
  </Link>
 </div>
</div>
 
</div>

</div>
</form>
                </div>
            </div>
        </>
    );
};

export default Edituser;
