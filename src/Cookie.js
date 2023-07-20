import React from 'react';
// const disapperbutton = () =>{
// let cookiesection =  document.getElementById('cookiesection');
// cookiesection.style.display = 'none';
// }
const Cookie = () => {
    return (
        <div>
            <div className='container-fluid cookiesection' id='cookiesection'>
                 <div className='row cookierow'> 
                       <div className='col-sm-12 col-lg-6'>
                            <p className='cookietext'>
                            We use cookies to improve functionality and performance of this site. By continuing to browse this site, you consent to the use of cookies.
                            </p>
                       </div>
                       <div className='col-sm-12 col-lg-3'>
                            <button type='button' className='cookiebutton agreeWithdata' >
                               <span>
                               {/* <a href="javascript:;" class="agreeWithdata"> */}
                                   ACCEPT ALL COOKIES
                                {/* </a>    */}
                               </span>
                            </button>
                       </div>
                 </div>
            </div>
            {/* <div class="GDPR-Popup-Block">
            <div class="GDPR-Popup-Box">
                <h6>Compliance Check</h6>
                <p>This site tracks visits anonymously using cookies. Close this dialog to assure us that you are happy with this. You can find out more in the our privacy policy statement. <a href="https://www.obbserv.com/privacy" target="_blank" class="btnlink">Privacy Policy</a> and <a href="https://www.obbserv.com/terms-and-conditions" target="_blank" class="btnlink">T&C</a></p>
                <a href="javascript:;" class="agreeWithdata">Agree and close</a>
            </div>
        </div>
        </div> */}
        </div>
    );
}

export default Cookie;