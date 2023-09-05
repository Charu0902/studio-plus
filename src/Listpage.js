import React, { useState, useEffect } from 'react'
import Table from './Table';
import { Link } from 'react-router-dom';


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
const Listpage = () =>{
//   const [category1, setCategory1]=useState([]);
// useEffect(()=>{
//     const getCategory = async()=>{
//         const res = await fetch('https://react.opositive.io/list.php')
//         const getdata = await res.json();
//         setCategory1(getdata);   
//     }
//     getCategory();

// },[]);
  return(
      <>
      <div className='row admin-dashboard-row'>
         <div className='col-lg-6 col-md-12 col-sm-12'>
         <h2 class="admin-dashboard">Clients Dasboard</h2>
             <p className='record-delete-message' id='record-delete'>Record deleted successfully!</p>
         </div>
         <div className='col-lg-3 col-md-12 col-sm-12 search-bar-div'>
      <input type="text" id="myInput" onKeyUp={myFunction} placeholder="Search By Name" title="Type in a name"/>
          
         </div>
      </div>
      <div className='row'>
      <div className='add-user-div'>
            <Link to={`/add-user`}><i class="fa fa-user-plus" aria-hidden="true"></i>
Add Client</Link>
            </div>
      </div>

  <div>
        {/* <table id="myTable">
<tr class="header">
<th>id</th>
  <th>Name</th>
  <th>Email</th>
  <th>Company</th>
  <th>Website</th>
  <th>Password</th>
  <th>Report Slug</th>
</tr>
{
      category1.map( (getcat)=>(
         <tbody>
               <tr key={getcat.id} className='table__row'>
                  <td className='table-col'>{getcat.id}</td>
                  <td className='table-col'>{getcat.name}</td>
                  <td className='table-col'>{getcat.email}</td>
                  <td className='table-col'>{getcat.company}</td>
                  <td className='table-col'><a href={getcat.url} target='_blank'>{getcat.url}</a></td>
                  <td className='table-col'>{getcat.password}</td>
                  <td className='table-col'>Empty</td>
              </tr>  
         </tbody>    
      )
       )
  }
</table> */}
<Table></Table>
  </div>

      </>
  )
}


export default Listpage;