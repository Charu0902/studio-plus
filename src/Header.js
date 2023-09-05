import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
  const [auth, setAuth] = useState();
  const [name, setname] = useState();
  useEffect(() => {
    var name = localStorage.getItem('name');
    setname(name);
  }, []);

  return (
    <>
      <Navbar expand="sm" className="studio-nav">
        <div className="container-fluid nav-container">
          <Navbar.Brand as={Link} to="/home" className="logo-pic">
            <img src="../Assets/opositive-logo.png" className="img-fluid" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="collapsibleNavbar" id="button-header" />
          <Navbar.Collapse id="collapsibleNavbar">
            <Nav className="navbar-nav">
              <Nav.Item className="nav-item welcome">
                <span>Welcome</span> : {name}
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/"><i className="fa fa-user" aria-hidden="true"></i> Logout</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </>
  )
}

export default Header;
