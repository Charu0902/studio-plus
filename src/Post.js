import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecordItem = () => {
  const { slug } = useParams();
  const [record, setRecord] = useState(null);

  const senddata = {
    slug : slug
}
// console.log(senddata);
  // useEffect(() => {
  //   fetchRecord();
  // }, []);

  // const fetchRecord = async () => {
  //   try {
  //     const response = await fetch(`https://react.opositive.io/fetch-single-report.php`, senddata);
      
  //     const data = await response.json();
  //     setRecord(data);
  //     console.log(data);

  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };



  // const  fetchRecord = async () => {
  //   const location = window.location.hostname;
  //   var formData = new FormData();
  //   formData.append('slug', slug);
  //   const settings = {
  //       method: 'POST',
  //       headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //       },
  //       body:JSON.stringify(formData)
  //   };
  //   try {
  //     const fetchResponse = await fetch(`https://react.opositive.io/fetch-single-report.php`, settings);
  //     const data = await fetchResponse.json();
  //     setRecord(data);
  //     console.log(data);
  //     return data;
  // } catch (e) {
  //     return e;
  // }  
  //   }
  const data = { slug: "obbserv" };
  axios({
    method: "post",
    url: "https://react.opositive.io/fetch-single-report.php",
    data: data,
    headers: { "Content-Type": "multipart/form-data" },
  })
  .then(function (response) {
     console.log(response);
    // console.log('mail sent')
  })
  .catch(function (response) {
    //handle error
    console.log(response);
  });
  // async function postJSON(data) {
  //   try {
  //     const response = await fetch("https://react.opositive.io/fetch-single-report.php", {
  //       method: "POST", // or 'PUT'
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  
  //     const result = await response.json();
  //     console.log("Success:", result);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  

  // postJSON(data);
  if (!record) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Record Details</h2>
      <p>Name: {record.name}</p>
      {/* <p>Description: {record.description}</p> */}
    </div>
  );
};

export default RecordItem;
