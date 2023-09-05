import React, { useState, useEffect } from 'react'
import Table from './Table';
import { Link } from 'react-router-dom';
import Reporttable from './Reporttable';


function myFunction() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
const Reports = () =>{

  return(
      <>
      <div className='row admin-dashboard-row'>
         <div className='col-lg-6 col-md-12 col-sm-12'>
         <h2 class="admin-dashboard">Reports Dasboard</h2>
             <p className='record-delete-message' id='record-delete'>Record deleted successfully!</p>
         </div>
         <div className='col-lg-3 col-md-12 col-sm-12 search-bar-div'>
      <input type="text" id="myInput" onKeyUp={myFunction} placeholder="Search By Report Name" title="Type in a name"/>
          
         </div>
      </div>
      <div className='row'>
      <div className='add-user-div'>
            <Link to={`/add-report`}><i class="fa fa-user-plus" aria-hidden="true"></i>
Add Report</Link>
            </div>
      </div>

  <div>
       
<Reporttable></Reporttable>
  </div>

      </>
  )
}


export default Reports;