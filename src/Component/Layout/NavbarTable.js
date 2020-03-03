import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logout from '../img/login.png'

const NavbarTable = () => {
    // console.log(product.id)

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#007BFF" }}>
            <div className="container">
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
        </Navbar>

    )
}

export default NavbarTable;