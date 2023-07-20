import React from "react";
// function Redirecthome(){
// setTimeout(function(){
//     window.location.href = "/";
// }, 3000)
// }
 function RedirectButton(){
     window.location.href = "/";
 }
const Thankyou = () =>{
    return(
        <>
        <div className="container thankyoupageparent">
            <img src="./Assets/Group.webp"/>
             <h1 className="thankyouheading">Thank You for Registering!</h1> 
             <p className="thankyoupara">Please proceed with login form.</p>
             <button className="thankyou-button" type="button" onClick={RedirectButton}>
                 Go to Login <i class="fa fa-long-arrow-right" aria-hidden="true"></i>

             </button>
        </div>
        </>
    )
}

export default Thankyou;