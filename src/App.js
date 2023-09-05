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
import Nforgetpassword from './Nforgetpassword';
import Client from './Client';
import Reports from './Report';
import Addreport from './Addreport';
import Editreport from './Editreport';

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
  <Route path='/forget-password' element = {<Nforgetpassword/>}/>
  <Route path='/reset-password' element = {<Resetpassword/>}/>
  <Route path='/table' element = {<Table/>}/>
  <Route path='/reports' element = {<Reports/>}/>
  <Route path='/add-report' element = {<Addreport/>}/>
  {/* <Route  path="/homes" element={<Nhome></Nhome>} />
  <Route  path="/client" element={<Client/>} /> */}
        {/* <Route path="/:slug" element={<Post></Post>} /> */}
    <Route path = '/add-user' element={<Adduser></Adduser>}/>
    <Route path='edit-user/:id' element = {<Edituser/>}></Route>
    <Route path='edit-report/:id' element = {<Editreport/>}></Route>
    <Route path = '/:slug' element={<Dcompo></Dcompo>}/>
    {/* <Route  path="/forget" element={<ForgotPasswordForm></ForgotPasswordForm>} />
        <Route path="/reset-password/:token" element={<ResetPasswordForm></ResetPasswordForm>} /> */}
        {/* <Route  path="/nforget" element={<Nforgetpassword></Nforgetpassword>} /> */}

</Routes>
</BrowserRouter>
<Cookie></Cookie>

   </>
  );
}

export default App;
