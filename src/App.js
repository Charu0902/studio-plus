import logo from './logo.svg';
import './App.css';
import Header from './Header';
import { BrowserRouter, Form, Route, Routes} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Register2 from './Register2';
import Thankyou from './Thankyou';
import Cookie from './Cookie';
import Forgetpassword from './Forgetpassword';
import Resetpassword from './Resetpassword';
import MaybeShowNavbar from './MaybeShowNavbar';
import Table from './Table';
import Read from './Read';
import React, { useState, useEffect } from "react";
import Nhome from './Nhome';
import Post from './Post';
import DataList from './DataList';
import DynamicDataComponent from './DynamicDataComponent';
import Adduser from './Adduser';
import Edituser from './Edituser';
import Dcompo from './Dcompo';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';

// import Form from './components/Form';
function App() {
  const [category1, setCategory1]=useState([]);
  useEffect(()=>{
   
    getCategory();
  
  },[]);
  const getCategory = async()=>{
    const res = await fetch('https://react.opositive.io/list.php')
    const getdata = await res.json();
    setCategory1(getdata);   
}

  return (
   <>
<BrowserRouter>
<MaybeShowNavbar>
<Header />

</MaybeShowNavbar>
<Routes>
  <Route exact path='/'  element = {<Login/>}/>
  <Route path='/register'  element = {<Register/>}/>
  <Route path='/home'  element = {<Home/>}/>
  <Route path='/register2'  element = {<Register2/>}/>
  <Route path='/thankyou'  element = {<Thankyou/>}/>
  <Route path='/forget-password' element = {<Forgetpassword/>}/>
  <Route path='/reset-password' element = {<Resetpassword/>}/>
  <Route path='/table' element = {<Table/>}/>
  {/* {
      category1.map( (getcat,index)=>(
         <Route path='/:company' element = {<Read name={getcat.name} email = {getcat.email}/>}/> 
      )
       )
  } */}
  <Route  path="/homes" element={<Nhome></Nhome>} />
        {/* <Route path="/:slug" element={<Post></Post>} /> */}
    <Route path = '/add-user' element={<Adduser></Adduser>}/>
    <Route path='edit-user/:id' element = {<Edituser/>}></Route>
    <Route path = '/:slug' element={<Dcompo></Dcompo>}/>
    <Route  path="/forget" element={<ForgotPasswordForm></ForgotPasswordForm>} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm></ResetPasswordForm>} />
</Routes>
</BrowserRouter>
<Cookie></Cookie>

   </>
  );
}

export default App;
