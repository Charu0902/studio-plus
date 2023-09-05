import axios from "axios";

import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";



const Edituser = () => {

        // Use the useNavigate hook from react-router-dom to get the navigation function
    let history = useNavigate();

        // Use the useParams hook from react-router-dom to get the 'id' parameter from the URL

    const { id } = useParams();

        // Set the initial state for the user data using the useState hook

        const [reportCheckboxes, setReportCheckboxes] = useState({});
        
        const [category1, setCategory1]=useState([]);

           // Fetch the category data

    useEffect(()=>{

   

      getCategory();

 

  },[]);

  const getCategory = async()=>{

    const res = await fetch('https://react.opositive.io/fetch-report.php')

    //Converts the data into json format

    const getdata = await res.json();

    //Updates the cataegory data state

    setCategory1(getdata);  

}

    const [user, setUser] = useState({
        name: "",
        email: "",
        url: "",
        slug: "",
        id: "",
    });



    useEffect(() => {
        loadUsers();
    }, []);

   
        // Destructure the user state object for easier access to its properties
    const { name, email, url, slug} = user;


        // Handle input change for text fields (name, email, url, password, slug, and iframe)
    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const sendReminder = (event,reportname) =>{
      const { email } = user;
      const uncheckedReports = [];
      
      const reportCheckboxes = document.querySelectorAll(`.access-required.checkbox.${reportname} input[type="checkbox"]`);
      reportCheckboxes.forEach(checkbox => {
        if (!checkbox.checked) {
          uncheckedReports.push(checkbox.name.split('_')[0]);
        }
      });
    
      console.log(uncheckedReports);
      console.log(email);
      console.log(reportname);
    if (event) {
      event.preventDefault();
    }
    axios.post("https://react.opositive.io/PHPMailer-master/studio-plus/send_reminder.php", { uncheckedReports,email,reportname })
    // .then(response => response.json())
    .then((response) => {
      console.log('Email sent');
      const reminderElement = document.querySelector(`.reminder.${reportname}`);
    if (reminderElement) {
      reminderElement.style.display = 'block';
    }
    
      //  setTimeout(myGreeting, 3000);
    
    // function myGreeting() {
    //   window.location.reload(false);
    // }
      
    })
    .catch((error) => {
      console.log('Error sending email:', error);
      // Redirect to the thank you page or any other page you like
    });
    event.preventDefault();
    }

    // Handle form submission to update the user data

    const updateFrom = async (e) => {

      e.preventDefault();

      const selectedReportsData = category1
        .filter((getcat) => reportCheckboxes[getcat.name])
        .map((getcat) => ({
          report_name: getcat.name,
          iframe_link: user[`iframelink${getcat.name}`] || "",
          ga: reportCheckboxes[getcat.name]?.ga ? "1" : "0",  // Use reportCheckboxes for specific report
          gsc: reportCheckboxes[getcat.name]?.gsc ? "1" : "0", // Use reportCheckboxes for specific report
          gmb: reportCheckboxes[getcat.name]?.gmb ? "1" : "0", // Use reportCheckboxes for specific report
          gads: reportCheckboxes[getcat.name]?.gads ? "1" : "0", // Use reportCheckboxes for specific report
          report_id: getcat.id,
        }));
        const selectedReportsData1 = category1
        .filter((getcat) => reportCheckboxes[getcat.name])
        .map((getcat) => ({
    
          report_id: getcat.id,
        }));
    
      const userData = {
        ...user,
        reports: selectedReportsData,
        selectedreports: selectedReportsData1
      };
      console.log(userData);
    };

    const handleReportCheckboxChange = (reportName) => {
      const isChecked = reportCheckboxes[reportName];
      
      if (isChecked) {
          // Show a confirmation dialog
          const confirmed = window.confirm("Are you sure you want to uncheck this report?");
          
          if (confirmed) {
              setReportCheckboxes((prevCheckboxes) => ({
                  ...prevCheckboxes,
                  [reportName]: !isChecked, // Toggle the checkbox state
              }));
          }
      } else {
          // The checkbox is already unchecked, just toggle it
          setReportCheckboxes((prevCheckboxes) => ({
              ...prevCheckboxes,
              [reportName]: !isChecked, // Toggle the checkbox state
          }));
      }
  };

    const handleCheckboxChange = (reportName, checkboxName) => {
      setReportCheckboxes((prevCheckboxes) => ({
        ...prevCheckboxes,
        [reportName]: {
          ...prevCheckboxes[reportName],
          [checkboxName]: !prevCheckboxes[reportName][checkboxName], // Toggle the checkbox state
        },
      }));
    };
    const areAllAccessChecked = (reportName) => {
      // List of access keys that need to be checked for the report
      const accessKeys = ['ga', 'gsc', 'gmb', 'gads'];
      return accessKeys.every((key) => reportCheckboxes[reportName]?.[key]);
    };
        // Load the user data from the backend API

    const loadUsers = async () => {
        console.log('AA' + id);
        try {
                // Send a GET request to the backend API to get the user data based on the 'id'
            const result = await axios.get('https://react.opositive.io/edit-user.php?id=' + id);
             // Extract the user data from the API response
            const userFromServer = result.data;
               // Set the user state with the fetched user data and convert checkbox values to booleans
            setUser({
                ...userFromServer
            });

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };


    return (

        <>
            <div className="container">
                <h1 className="heading">Edit Client</h1>
                <p id="success">Client Updated Successfully!</p>
                <div className="row edit-user-row">
                <form onSubmit={e => updateFrom(e)}>
<div className="col-lg-12">
<div className="row">
<div className="col-lg-6 col-md-12 register-form-col">
<label >Name</label>
<input type="text"  name='user_name' className="form-control" value={name} onChange={e => handleChange(e)}/>
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
<label>Slug</label>
<input type="text"  name='slug' required className="form-control" value={slug} onChange={e => handleChange(e)}/>
</div>
</div>
<br />
<div className="col-lg-6 col-md-12 register-form-col">
<div className="row access-row">
  <p className="select-reports">Select reports</p>
  {category1.map((getcat, index) => (
    <div className="col-lg-3 col-sm-12 access-required" key={getcat.id}>
      <label>{getcat.name}</label>
      <input
        type="checkbox"
        name={getcat.name}
        checked={reportCheckboxes[getcat.name]}
        onChange={() => handleReportCheckboxChange(getcat.name)}
        value={getcat.id}
        id={getcat.name}
      />
    </div>
  ))}
</div>
</div>
<div className="row reports-row" >
{category1.map((getcat) => (
  reportCheckboxes[getcat.name] && (
      <div className="col-lg-5 col-md-12 col-sm-12 add-new-report-card" key={getcat.name}>
        <h2 className={`report-heading ${getcat.name}`}>{getcat.name} Report</h2>
        <p className={`reminder ${getcat.name}`}>Reminder Mail Sent</p>
        {areAllAccessChecked(getcat.name) && (
        <div className="col-lg-11 col-md-12 report-form-col">
                <label>Iframe Link</label>
             <input type="url"  className="form-control" name={`iframelink${getcat.name}`}  onChange={e => handleChange(e)}/>
             </div>
             )}
   <div className="col-lg-11 col-md-12 report-form-col">
           <label>Access Granted</label>
           <div className="row access-row">
                   <div className={`col-lg-3 col-sm-12 access-required checkbox ${getcat.name}`}>
                     <label>GA</label>
                     <input
              type="checkbox"
              name={`ga_${getcat.name}`} // Use a unique name for each checkbox
              checked={reportCheckboxes[getcat.name]?.ga}
              onChange={() => handleCheckboxChange(getcat.name, "ga")}
            />
                   </div>
                   <div className={`col-lg-3 col-sm-12 access-required checkbox ${getcat.name}`}>
                     <label>GSC</label>
                     <input
type="checkbox"
name={`gsc_${getcat.name}`} // Use a unique name for each checkbox
checked={reportCheckboxes[getcat.name]?.gsc}
onChange={() => handleCheckboxChange(getcat.name, "gsc")}
                     />
                   </div>
                   <div className={`col-lg-3 col-sm-12 access-required checkbox ${getcat.name}`}>
                     <label>GMB</label>
                     <input
type="checkbox"
name={`gmb_${getcat.name}`} // Use a unique name for each checkbox
checked={reportCheckboxes[getcat.name]?.gmb}
onChange={() => handleCheckboxChange(getcat.name, "gmb")}
                     />
                   </div>
                   <div className={`col-lg-3 col-sm-12 access-required checkbox ${getcat.name}`}>
                     <label>GADS</label>
                     <input
      type="checkbox"
      name={`gads_${getcat.name}`} // Use a unique name for each checkbox
      checked={reportCheckboxes[getcat.name]?.gads}
      onChange={() => handleCheckboxChange(getcat.name, "gads")}
                     />
                   </div>
               </div>
           <div className="row send-reminder-row">
           {!areAllAccessChecked(getcat.name) && (
    <button type="button" className="reminder-button" onClick={(e) => sendReminder(e, getcat.name)}>
      Send Reminder
    </button>
       )}
    {areAllAccessChecked(getcat.name) && (
    <button type="button" className="reminder-button">
     Publish
    </button>
     )}
           </div>
   </div>
      </div>
  )
))}
</div>
<div className="col-lg-6 col-md-12 text-left register-button">
<div className="row edit-user-submit">
 <div className="col-lg-4 col-md-12">
 <input type="submit" name = 'submit' value='Update Client' className="btn btn-success"/>
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



