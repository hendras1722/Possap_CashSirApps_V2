import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import { Col, Button } from 'react-bootstrap'
import log_out from '../img/login.png'
import logocat from '../img/admin.png'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class NavbarPage extends Component {
    render() {
        const ValidasiFrom = () => {
            if (localStorage.getItem('Status') == '1') {
                return (
                    <Fragment>

                        <Link to="/settings"><button style={{ backgroundColor: "#3346A8", border: "none" }}> <img src={logocat} style={{ width: "30px", height: "30px" }} /></button></Link>
                        <Link onClick={logout}><button style={{ backgroundColor: "#3346A8", border: "none" }}> <img src={log_out} style={{ width: "30px", height: "30px" }} /></button></Link>

                    </Fragment>
                )
            }
            else {
                return (
                    <Fragment />
                )
            }
        }
        const { logout } = this.props
        return (
            <Row>
                <Col sm={8}>
                    <div>
                        <Navbar style={{ backgroundColor: "#3346A8", height: "60px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)", width: "1029px" }}>
                            <Navbar.Brand className="text-white text-center">Admin</Navbar.Brand>

                            <ValidasiFrom />
                            <p>Welcome <Link to="#" onClick={logout}>Logout</Link></p>


                        </Navbar>
                    </div>
                </Col>
                <Col sm={4}>
                    <Navbar style={{ backgroundColor: "#3346A8", height: "60px", marginLeft: "110px", width: "335px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)" }}>
                        <Navbar.Brand className="text-white" style={{ marginLeft: "50px" }} > Cart < span class="badge badge-primary">0</span></Navbar.Brand>

                    </Navbar>
                </Col>
            </Row >

        )
    }
}

export default withRouter(NavbarPage);