import React from "react";

const PersonalInfo = ({formdata,setFromData}) =>{

    return(
        <>
        <div className="personal-info-container">
        {/* <input type="checkbox" id="vehicle1" name="vehicle1" value='bike' onChange={(event) => setFromData({...formdata, bike: event.target.value})}/>
  <label for="vehicle1"> I have a bike</label> */}

        <input type='text' placeholder='GA report required (Yes/No)' value={formdata.ga} onChange={(event) => setFromData({...formdata, ga: event.target.value})} required/>
        <input type='text' placeholder='GSC report required (Yes/No)' value={formdata.gsc} onChange={(event) => setFromData({...formdata, gsc: event.target.value})} required/>
        <input type='text' placeholder='GMB report required (Yes/No)' value={formdata.gmb} onChange={(event) => setFromData({...formdata, gmb: event.target.value})} required/>
        <input type='text' placeholder='Google Ads report required (Yes/No)' value={formdata.googleads} onChange={(event) => setFromData({...formdata, googleads: event.target.value})} required/>

        </div>
        </>
    )
}

export default PersonalInfo;