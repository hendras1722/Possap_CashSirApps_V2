import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import LogCat from '../img/list.png'
import { searchProduct } from "../redux/actions/Product";
import { connect } from 'react-redux';

class SectionTop extends Component {

    searchProduct = (event) => {
        console.log(event.target.value)
        this.props.dispatch(searchProduct(event.target.value));
    }

    render() {
        console.log('render');
        return (
            <Row>
                <Col sm={8} className="p-4">
                    <Row>
                        <Col>
                            <Dropdown>
                                <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ border: "1px solid rgba(0, 0, 0, 0.3)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", boxSizing: "border-box", width: "150px" }}>
                                    <img src={LogCat} style={{ position: "absolute", width: "20px", height: "20px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)", marginLeft: "-25px", marginTop: "2px" }} />
                                    Category
  </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">Microcontroller</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Component</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                        <Col>
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ border: "1px solid #000000", borderRadius: "20px", boxSizing: "border-box", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", marginLeft: "-30px", marginTop: "5px" }} onChange={this.searchProduct} />
                        </Col>
                    </Row>

                </Col>
                <Col sm={4} style={{ marginLeft: "-14px", width: "15px", backgroundColor: "#FFFFFF", padding: "5px", marginTop: "10px" }} >sm=4</Col>
            </Row>
        )
    }
}
const searchStateToProps = (state) => {
    //console.log(state)
    return {
        products: state.products.products
    }
}

export default connect(searchStateToProps)(SectionTop);
