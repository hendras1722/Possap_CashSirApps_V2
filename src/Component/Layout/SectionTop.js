import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Button } from 'react-bootstrap'
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown'
import LogCat from '../img/list.png'
import { searchProduct } from "../redux/actions/Product";
import { connect } from 'react-redux';
import { getCategory } from '../redux/actions/Category'
import { withRouter } from "react-router";
import plus from '../img/icons.png'
import ModalAdd from '../Layout/ModalAdd'
import { addQty, reduceQty, addCart, deleteCart } from '../redux/actions/carts'
import rmv from '../img/remove.png'
import NumberFormat from 'react-number-format';


class SectionTop extends Component {
    state = {
        categorys: [],
        microcontroller: '',
        komponen: '',
        searchName: '',
        idCategory: '',
        sortBy: '',
        pagination: '',
        showAdd: false,
        show: false
    }

    onDeleteCart = (id) => {
        console.log(id)
        this.props.dispatch(deleteCart(id))
    }

    // modal add
    handleShowAdd = (e) => {
        // console.log(e)
        this.setState({
            idProduct: e.target.value,
            showAdd: true
        })
        console.log('eqwkemwqke')
    }

    handleCloseAdd = () => {
        this.setState({
            showAdd: false
        })
    }

    sortProduct = (event) => {
        this.setState({
            idCategory: event
        })

        // this.props.history.push(`/pos?name=${this.state.searchName}&idCat=${event}&orderBy=ASC`);
        console.log(this.state.idCategory)
        console.log("wkwkwk")
        console.log(`ini state ${this.state.idCategory}`)
        this.props.dispatch(searchProduct(this.state.searchName, event, this.state.paginationProduct));
    }

    searchProduct = (event) => {
        this.setState({
            searchName: event.target.value,
        })

        console.log("wkwkwk")
        // this.props.history.push(`/pos?name=${event.target.value}&idCat=${this.state.idCategory}&orderBy=ASC`);
        console.log(event.target.value)
        console.log(`ini state ${this.state.searchName}`)
        this.props.dispatch(searchProduct(event.target.value, this.state.idCategory, this.state.paginationProduct));
    }

    getCategory = async () => {
        await this.props.dispatch(getCategory())
    }

    componentDidMount() {
        this.getCategory();
    }

    addQuantity = (id) => {

        this.props.dispatch(addQty(id))
    }
    reduceQuantity = (id) => {
        // console.log(qty)

        this.props.dispatch(reduceQty(id))

    }

    deleteQuantitiy = (id) => {
        this.props.dispatch(deleteCart(id))
    }


    render() {
        const { categorys, cart, total, hide } = this.props;
        // console.log(categorys);
        return (
            <>
                <div class="row p-4">
                    <div class="col-sm-10">
                        <Dropdown style={{ marginLeft: "20px", display: "inline" }}>
                            <Dropdown.Toggle variant="white" id="dropdown-basic" style={{ border: "1px solid rgba(0, 0, 0, 0.3)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", boxSizing: "border-box", width: "150px" }}>
                                Category
               </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.sortProduct('')} >All</Dropdown.Item>
                                {categorys.map((category, index) =>
                                    <Dropdown.Item onClick={() => this.sortProduct(category.id)} key={index} value={category.id}>{category.name_category}</Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button onClick={this.handleShowAdd} style={{ marginLeft: 10, backgroundColor: 'transparent', border: '1px solid black' }} hidden={hide} className='d-inline'>
                            <img src={plus} style={{ width: 20, height: 20, display: 'inline', border: 'none' }} />
                        </Button>
                        <ModalAdd show={this.state.showAdd} onHide={this.handleCloseAdd} />
                        {/* <div className='row'> */}
                        <div className='col-7 d-inline-block'>
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style={{ border: "1px solid #000000", borderRadius: "5px", boxSizing: "border-box", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", display: 'inline' }} onChange={this.searchProduct} />
                        </div>
                        {/* </div> */}

                    </div>
                    <div class="col-sm-2">
                        <Dropdown style={{ marginLeft: "70px", display: "inline", marginLeft: -50, width: "15px" }}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ border: "1px solid rgba(0, 0, 0, 0.3)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", boxSizing: "border-box", width: "100px" }}>
                                Cart
               </Dropdown.Toggle>

                            <Dropdown.Menu style={{ marginLeft: -70, width: 320, padding: 10, marginTop: 120, overflowY: "scroll", height: '400px', maxHeight: '400' }}>
                                {cart.map((cart) =>
                                    <div style={{ paddingTop: 20, border: '1px solid rgb(7,8,17,0.18)', height: 180, borderRadius: 15 }}>
                                        <img src={rmv} style={{ width: "15px", height: "15px", position: 'absolute', marginLeft: 10 }} onClick={() => this.onDeleteCart(cart.id)} />
                                        < img src={cart.image} style={{ display: "inline", width: "100px", height: "100px", marginTop: "10px", padding: 10 }} />
                                        <h5 style={{ display: "inline", maginTop: "-800px", left: 10 }}>{cart.name}</h5>
                                        <p style={{ display: "block", marginLeft: "100px", marginTop: "-30px" }}> <NumberFormat value={cart.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />,-</p>

                                        <div style={{ marginLeft: "230px", marginTop: "-120px" }}>
                                            <button className="btn btn-outline-primary" style={{ borderRadius: 100, display: 'inline' }} onClick={() => (this.reduceQuantity(cart.id))}> - </button>

                                            <p style={{ marginLeft: "10px", marginTop: "15px", display: 'absolute' }}>{cart.qty}</p>

                                            <button className="btn btn-outline-primary" style={{ display: 'inline', borderRadius: 100 }} onClick={() => (this.addQuantity(cart.id))}>+</button>
                                        </div>
                                    </div>
                                )}
                                <div style={{ marginTop: 10 }}>
                                    <h4 style={{ marginLeft: '0px' }}>Total : <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />,-</h4>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>
                </div>
            </>
            //             <Row>
            //                 <Col sm={6}>
            //                     <Row>
            //                         <Col>
            //                            
            //                         </Col>
            //                         <Col >
            //                            
            //                         </Col>
            //                     </Row>

            //                 </Col>
            //                 <Col sm={2} style={{ marginLeft: "00px", width: "15px", backgroundColor: "#FFFFFF", padding: "5px", marginTop: "20px" }} >

            //                 </Col>
            //                 <Col sm={2} style={{ backgroundColor: "red", padding: "5px", marginTop: "20px" }} >
            //                     
            //                 </Col>
            //             </Row >
        )
    }
}


const searchStateToProps = (state) => {
    return {
        hide: state.products.hide,
        products: state.products.products,
        categorys: state.categorys.categorys,
        cart: state.cart.cart,
        total: state.cart.total

    }
}

export default withRouter(connect(searchStateToProps)(SectionTop));