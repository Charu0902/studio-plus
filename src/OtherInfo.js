import React from "react";

const OtherInfo = ({formdata,setFromData}) =>{
    return(
        <>
        <div className="other-info-container">
        <input type='text' placeholder='Nationality...' value={formdata.nationality} onChange={(event) => setFromData({...formdata, nationality: event.target.value})}/>
        <input type='text' placeholder='Other...' value={formdata.other} onChange={(event) => setFromData({...formdata, other: event.target.value})}/>

        </div>
        </>
    )
}

export default OtherInfo;