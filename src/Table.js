import React, { useState, useEffect } from 'react'

import $ from 'jquery';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Table = () =>{
    useEffect(() =>{
        getPagination('#myTable');
   

function getPagination(table) {
var lastPage = 1;

$('#maxRows')
.on('change', function(evt) {

lastPage = 1;
$('.pagination')
.find('li')
.slice(1, -1)
.remove();
var trnum = 0; // reset tr counter
var maxRows = parseInt($(this).val()); // get Max Rows from select option

if (maxRows == 5000) {
$('.pagination').hide();
} else {
$('.pagination').show();
}

var totalRows = $(table + ' tbody tr').length; // numbers of rows
$(table + ' tr:gt(0)').each(function() {
// each TR in  table and not the header
trnum++; // Start Counter
if (trnum > maxRows) {
// if tr number gt maxRows

$(this).hide(); // fade it out
}
if (trnum <= maxRows) {
$(this).show();
} // else fade in Important in case if it ..
}); //  was fade out to fade it in
if (totalRows > maxRows) {
// if tr total rows gt max rows option
var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
//	numbers of pages
for (var i = 1; i <= pagenum; ) {
// for each page append pagination li
$('.pagination #prev')
.before(
  '<li data-page="' +
    i +
    '">\
                      <span>' +
    i++ +
    '<span class="sr-only">(current)</span></span>\
                    </li>'
)
.show();
} // end for i
} // end if row count > max rows
$('.pagination [data-page="1"]').addClass('active'); // add active class to the first li
$('.pagination li').on('click', function(evt) {
// on click each page
evt.stopImmediatePropagation();
evt.preventDefault();
var pageNum = $(this).attr('data-page'); // get it's number

var maxRows = parseInt($('#maxRows').val()); // get Max Rows from select option

if (pageNum == 'prev') {
if (lastPage == 1) {
return;
}
pageNum = --lastPage;
}
if (pageNum == 'next') {
if (lastPage == $('.pagination li').length - 2) {
return;
}
pageNum = ++lastPage;
}

lastPage = pageNum;
var trIndex = 0; // reset tr counter
$('.pagination li').removeClass('active'); // remove active class from all li
$('.pagination [data-page="' + lastPage + '"]').addClass('active'); // add active class to the clicked
// $(this).addClass('active');					// add active class to the clicked
limitPagging();
$(table + ' tr:gt(0)').each(function() {
// each tr in table not the header
trIndex++; // tr index counter
// if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
if (
trIndex > maxRows * pageNum ||
trIndex <= maxRows * pageNum - maxRows
) {
$(this).hide();
} else {
$(this).show();
} //else fade in
}); // end of for each tr in table
}); // end of on click pagination list
limitPagging();
})
.val(7)
.change();

// end of on select change

// END OF PAGINATION
}

function limitPagging(){
// alert($('.pagination li').length)

if($('.pagination li').length > 7 ){
if( $('.pagination li.active').attr('data-page') <= 3 ){
$('.pagination li:gt(5)').hide();
$('.pagination li:lt(5)').show();
$('.pagination [data-page="next"]').show();
}if ($('.pagination li.active').attr('data-page') > 3){
$('.pagination li:gt(0)').hide();
$('.pagination [data-page="next"]').show();
for( let i = ( parseInt($('.pagination li.active').attr('data-page'))  -2 )  ; i <= ( parseInt($('.pagination li.active').attr('data-page'))  + 2 ) ; i++ ){
    $('.pagination [data-page="'+i+'"]').show();

}

}
}
}

    })

    // State to hold the category data

    const [category1, setCategory1]=useState([]);
    // Fetch the category data 
    useEffect(()=>{
   
        getCategory();
    
    },[]);
     // Function to fetch category data from the server
         const getCategory = async()=>{
            const res = await fetch('https://react.opositive.io/list.php')
            //Converts the data into json format
            const getdata = await res.json();
            //Updates the cataegory data state
            setCategory1(getdata);   
        }
// Function to delete a user by ID
        const deleteUser = (id) =>{
          //Axios js is a promise-based HTTP library that lets you consume an API service
            axios.delete('https://react.opositive.io/delete.php', {data: {id : id}})
            .then((res) =>{
                getCategory();
                var deleteusermessage =  document.getElementById('record-delete');
                  deleteusermessage.style.display = 'block';
                  setTimeout(function(){
                    var deleteusermessage =  document.getElementById('record-delete');
                  deleteusermessage.style.display = 'none';
                  }, 4000)

            }).catch(() => {
alert('Error in the code')
            })
        }
    return(
        
        <>
    <div class="container table-container">
		{/* <h2>Select Number Of Rows</h2> */}
				

                  <table  id="myTable">
                    <thead>
<tr class="header">
<th>id</th>
  <th>Name</th>
  <th>Email</th>
  {/* <th>Company</th> */}
  <th>Website</th>
  {/* <th>Password</th> */}
  <th>GA</th>
  <th>GSC</th>
  <th>GMB</th>
  <th>Google Ads</th>
  <th>Report Slug</th>
  <th>Action</th>

</tr>
</thead>
{
      category1.map( (getcat,index)=>(
         <tbody>
               <tr key={getcat.id} className='table__row'>
                  <td className='table-col'>{getcat.id - 27}</td>
                  <td className='table-col'>{getcat.name}</td>
                  <td className='table-col'>{getcat.email}</td>
                  {/* <td className='table-col'>{getcat.company}</td> */}
                  <td className='table-col'><a href={getcat.url} target='_blank'>{getcat.url}</a></td>
                  {/* <td className='table-col'>{getcat.password}</td> */}
                  <td className='table-col'>{getcat.ga  === 1 ? 'Received' : 'Pending'}</td>
                  <td className='table-col'>{getcat.gsc  === 1 ? 'Received' : 'Pending'}</td>
                  <td className='table-col'>{getcat.gmb  === 1 ? 'Received' : 'Pending'}</td>
                  <td className='table-col'>{getcat.gads  === 1 ? 'Received' : 'Pending'}</td>
                  <td className='table-col'>
                  <Link to={`/${getcat.slug}`}>{getcat.slug}</Link>
                  </td>
                  <td className='table-col'>
                    <Link to='' onClick={() =>deleteUser(getcat.id) }>
                    <i class="fa fa-trash delete-icon" aria-hidden="true"></i>

                    </Link>

                    <Link to={`/edit-user/${getcat.id}`}>

                    <i class="fa fa-pencil-square" aria-hidden="true"></i>


                    </Link>
                    {/* <Link to={`/${getcat.slug}`}>

                    View


                    </Link> */}
                  </td>

              </tr>  
         </tbody>    
      )
       )
  }
</table>

			<div class='pagination-container' >
				<nav>
				  <ul class="pagination">
            
            <li data-page="prev" >
								     <span> {'<'} <span class="sr-only">(current)</span></span>
								    </li>
        <li data-page="next" id="prev">
								       <span> {'>'} <span class="sr-only">(current)</span></span>
								    </li>
				  </ul>
				</nav>
                <div class="form-group"> 	
			 		<select class  ="form-control" name="state" id="maxRows">
						 <option value="5000">Show ALL Rows</option>
						 <option value="7">7</option>
						 <option value="15">15</option>
						 <option value="30">30</option>
						 
						</select>
			 		
			  	</div>
			</div>

</div> 



        </>
    )
}

export default Table;