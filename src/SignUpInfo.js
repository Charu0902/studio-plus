import React from 'react'

const SignUpInfo = ({formdata,setFromData}) =>{
    return(
        <>
        <div className='sign-up-container'>
          <input type='name' placeholder='Name'value={formdata.name} onChange={(event) => setFromData({...formdata, name: event.target.value})} required/>
          <input type='email' placeholder='Email' value={formdata.email} onChange={(event) => setFromData({...formdata, email: event.target.value})} required/>
          <input type='text' placeholder='Company Name' value={formdata.companyName} onChange={(event) => setFromData({...formdata, companyName: event.target.value})}/>
          <input type='url' placeholder='Website url' value={formdata.websiteurl} onChange={(event) => setFromData({...formdata, websiteurl: event.target.value})} required/>
          <input type='password' placeholder='Password' value={formdata.password} onChange={(event) => setFromData({...formdata, password: event.target.value})} required/>

        </div>
        </>
    )
}

export default SignUpInfo;