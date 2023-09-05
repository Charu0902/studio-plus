import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Editreport = () => {
        // Use the useNavigate hook from react-router-dom to get the navigation function

    let history = useNavigate();

        // Use the useParams hook from react-router-dom to get the 'id' parameter from the URL

    const { id } = useParams();

        // Set the initial state for the user data using the useState hook

    const [user, setUser] = useState({
        name: "",
        image: "",
        id: "",
        ga: 0,
        gsc: 0,
        gmb: 0,
        gads: 0
    });

    useEffect(() => {
        loadUsers();
    }, []);

        // Destructure the user state object for easier access to its properties

    const { name, image } = user;

        // Handle input change for text fields (name, email, url, password, slug, and iframe)

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };
        // Handle checkbox change for GA (Google Analytics) access

        const handleCheckboxChange = (e) => {
            setUser({ ...user, [e.target.name]: e.target.checked ? 1 : 0 });
        };
    
    // Handle form submission to update the user data

    const updateFrom = async (e) => {
        e.preventDefault();
        console.log(user);

         

        const userData = {
            ...user,
      
        };
        console.log(userData);

        try {
            // Send a POST request to the backend API to update the user data

            await axios.post('https://react.opositive.io/update-report.php', userData);
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
            const response = await axios.get(`https://react.opositive.io/fetch-report.php?id=${id}`);
            const reportData = response.data.find(report => report.id === parseInt(id, 10));
            setUser(reportData);
        } catch (error) {
            console.error("Error fetching report data:", error);
        }
    };

    return (
        <>
            <div className="container">
                <h1 className="heading">Edit Report</h1>
                <p id="success">User Updated Successfully!</p>
                <div className="row edit-user-row">
                <form onSubmit={e => updateFrom(e)}>

<div className="col-lg-12">
<div className="row">
<div className="col-lg-6 col-md-12 register-form-col"> 
<label >Report Name</label>
<input type="text"  name='name' className="form-control" value={name} onChange={e => handleChange(e)}/>
</div>
<div className="col-lg-6 col-md-12 register-form-col"> 
<label>Image Url</label>
<input type="url"  name='image' required className="form-control" value={image} onChange={e => handleChange(e)}/>
</div>

<div className="col-lg-6 col-md-12 register-form-col report-access-row">
    <b>Select required access</b>
                        <div className="row access-row report-access-inner-row">
                          <div className="col-lg-3 col-sm-12 access-required">
                          <label>GA </label>
                            <input
                                type="checkbox"
                                name="ga"
                                checked={user.ga === 1}
                                onChange={handleCheckboxChange}
                            />
                          </div>
                          <div className="col-lg-3 col-sm-12 access-required">
                          <label>GSC </label>
                            <input
                                type="checkbox"
                                name="gsc"
                                checked={user.gsc === 1}
                                onChange={handleCheckboxChange}
                            />
                          </div>
                          <div className="col-lg-3 col-sm-12 access-required">
                          <label>GMB </label>
                            <input
                                type="checkbox"
                                name="gmb"
                                checked={user.gmb === 1}
                                onChange={handleCheckboxChange}
                            />
                          </div>
                          <div  className="col-lg-3 col-sm-12 access-required">
                          <label>GADS </label>
                            <input
                                type="checkbox"
                                name="gads"
                                checked={user.gads === 1}
                                onChange={handleCheckboxChange}
                            />
                          </div>
                        </div>
</div>
</div>

<br />

<div className="col-lg-6 col-md-12 text-left register-button">
<div className="row edit-user-submit">
 <div className="col-lg-4 col-md-12">
 <input type="submit" name = 'submit' value='Update Report' className="btn btn-success"/>
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

export default Editreport;

