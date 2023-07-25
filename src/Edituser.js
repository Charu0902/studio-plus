import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edituser = () => {
    let history = useNavigate();
    const { id } = useParams();
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

    const { name, email, url, password, slug, iframe, gaChecked, gscChecked, gmbChecked, gadsChecked } = user;

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

    const updateFrom = async (e) => {
        e.preventDefault();
        console.log(user);

        const userData = {
            ...user,
            ga: user.gaChecked ? '1' : '0',
            gsc: user.gscChecked ? '1' : '0',
            gmb: user.gmbChecked ? '1' : '0',
            gads: user.gadsChecked ? '1' : '0',
        };
        console.log(userData);

        try {
            await axios.post('https://react.opositive.io/update.php', userData);
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

    const loadUsers = async () => {
        console.log('AA' + id);
        try {
            const result = await axios.get('https://react.opositive.io/edit.php?id=' + id);
            const userFromServer = result.data;
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
<br/>
<b>Access required?</b>
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
<div className="row">
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
