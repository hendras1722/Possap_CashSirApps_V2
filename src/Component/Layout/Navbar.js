import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logout from '../img/login.png'

const NavbarPage = () => {
    // console.log(product.id)

    return (
        <Row>
            <Col sm={8}>
                <div>
                    <Navbar style={{ backgroundColor: "#3346A8", height: "60px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)" }}>
                        <Navbar.Brand className="text-white text-center">Brand link</Navbar.Brand>
                    </Navbar>
                </div>
            </Col>
            <Col sm={4}>
                <Navbar style={{ backgroundColor: "#3346A8", height: "60px", marginLeft: "-29px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)" }}>
                    <Navbar.Brand className="text-white" style={{ marginLeft: "150px" }} > Cart < span class="badge badge-primary">0</span></Navbar.Brand>
                    <div style={{ backgroundColor: "#5C61D9", width: "50px", height: "50px", borderRadius: "10px", marginLeft: "auto" }}>
                        <img src={logout} style={{ width: "32px", height: "32px", padding: "2px", marginLeft: "5px", marginTop: "8px" }} />
                    </div>
                </Navbar>
            </Col>
        </Row >

    )
}

export default NavbarPage;