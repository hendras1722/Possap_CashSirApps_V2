import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, NavDropdown, Form, FormControl, Button, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const NavbarTable = () => {
    // console.log(product.id)

    return (
        <Navbar expand="lg" style={{ backgroundColor: "#007BFF" }}>
            <div className="container">

                <Link to="/"><button className="btn btn-primary text-white" style={{ backgroundColor: "#3346A8", border: "none" }}>Back</button></Link>
                <Navbar.Brand href="#" style={{ color: "white" }}>Settings</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
            </div>
        </Navbar>

    )
}

export default NavbarTable;