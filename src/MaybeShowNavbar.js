import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";


const MaybeShowNavbar = ({children}) =>{

    const location = useLocation();
    const [showNavbar , setshowNavbar] = useState(false);
    useEffect(() =>{
console.log('this is location:', location)
if(location.pathname === '/'){
    setshowNavbar(false)
}
else if(location.pathname === '/forget-password'){
    setshowNavbar(false)

}
else if(location.pathname === '/reset-password'){
    setshowNavbar(false)

}
else if(location.pathname === '/register'){
    setshowNavbar(false)

}
else{
    setshowNavbar(true)
}
    },[location])
    return(
        <>
        <div>
            {showNavbar && children}
        </div>
        </>
    )
}

export default MaybeShowNavbar;