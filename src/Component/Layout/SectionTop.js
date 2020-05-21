import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown'
import { searchProduct } from "../redux/actions/Product";
import { connect } from 'react-redux';
import { getCategory } from '../redux/actions/Category'
import { withRouter } from "react-router";
import { addQty, reduceQty, deleteCart } from '../redux/actions/carts'
import rmv from '../img/remove.png'
import NumberFormat from 'react-number-format';
import { paginationProduct } from '../redux/actions/Product'

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
        this.props.dispatch(deleteCart(id))
    }

    paginationProduct = async (event) => {
        await this.props.dispatch(paginationProduct(event))
    }

    // modal add
    handleShowAdd = (e) => {
        this.setState({
            idProduct: e.target.value,
            showAdd: true
        })
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

        this.props.dispatch(searchProduct(this.state.searchName, event, this.state.paginationProduct));
    }

    searchProduct = (event) => {
        this.setState({
            searchName: event.target.value,
        })
        this.props.history.push(`?name=${this.state.searchName}&idCat=${event}&orderBy=ASC`);
        this.props.dispatch(searchProduct(event.target.value, this.state.idCategory, this.state.paginationProduct));
    }

    getCategory = async (event) => {
        await this.props.dispatch(getCategory())
    }

    async componentDidMount() {
        await this.getCategory();
        await this.paginationProduct();
    }

    addQuantity = (id) => {

        this.props.dispatch(addQty(id))
    }
    reduceQuantity = (id) => {
        this.props.dispatch(reduceQty(id))
    }

    deleteQuantitiy = (id) => {
        this.props.dispatch(deleteCart(id))
    }


    render() {
        const { categorys, cart, total } = this.props;
        return (
            <div className="container-fluid">
                <div className="row p-4">
                    <div className="col-sm-8">
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
                        <div className='col-7 d-inline-block'>
                            <input className="form-control mr-sm-2 bg-white" type="search" placeholder="Search" aria-label="Search" style={{ border: "1px solid #000000", borderRadius: "5px", boxSizing: "border-box", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", display: 'inline' }} onChange={this.searchProduct} />
                        </div>

                    </div>
                    <div className="col-sm-1">
                        <Dropdown style={{ display: "inline", width: "15px" }}>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic" style={{ border: "1px solid rgba(0, 0, 0, 0.3)", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", boxSizing: "border-box", width: "100px" }}>
                                Cart
               </Dropdown.Toggle>

                            <Dropdown.Menu style={{ width: 320, padding: 10, marginTop: 120, overflowY: "scroll", height: '400px', maxHeight: '400' }}>
                                {cart.map((cart) =>
                                    <div style={{ paddingTop: 20, border: '1px solid rgb(7,8,17,0.18)', height: 180, borderRadius: 15 }}>
                                        <img src={rmv} alt="iconremove" style={{ width: "15px", height: "15px", position: 'absolute', marginLeft: 10 }} onClick={() => this.onDeleteCart(cart.id)} />
                                        <img src={cart.image} alt="cart" style={{ display: "inline", width: "100px", height: "100px", marginTop: "10px", padding: 10 }} />
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
            </div>
        )
    }
}


const searchStateToProps = (state) => {
    return {
        hide: state.products.hide,
        products: state.products.products,
        categorys: state.categorys.categorys,
        cart: state.cart.cart,
        total: state.cart.total,
        pagination: state.products.pagination,

    }
}

export default withRouter(connect(searchStateToProps)(SectionTop));