import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import Row from 'react-bootstrap/Row'
import { Col, Button } from 'react-bootstrap'
import log_out from '../img/login.png'
import logocat from '../img/admin.png'
import { Link, withRouter } from 'react-router-dom'
import { addQty, reduceQty, addCart } from '../redux/actions/carts'
import { connect } from 'react-redux';
import { orderCheckout } from '../redux/actions/order'
import NumberFormat from 'react-number-format';

class NavbarPage extends Component {
    state = {
        count: parseInt(this.props.cart.length) || 0
    }

    onSubmit = async () => {
        const data = {
            idBuyer: parseInt(localStorage.getItem('id')),
            products: this.props.cart
        }
        await this.props.dispatch(orderCheckout(data))
    }

    render() {
        // console.log(this.props.cart.length === 1, "dsakdasld")
        const ValidasiFrom = () => {
            if (localStorage.getItem('Status') == '1') {
                return (
                    <Fragment>
                        <Navbar.Brand className="text-white text-center">Admin</Navbar.Brand>
                        <Link to="/settings"><button style={{ backgroundColor: "#3346A8", border: "none" }}> <img src={logocat} style={{ width: "30px", height: "30px" }} /></button></Link>

                    </Fragment>
                )
            }
            else if (localStorage.getItem('Status') == '2') {
                return (
                    <Fragment>
                        <Navbar.Brand className="text-white text-center">Cashier</Navbar.Brand>
                    </Fragment>
                )
            }
            else {
                return (
                    <Fragment></Fragment>
                )
            }
        }

        const { logout, cart, total } = this.props
        console.log(this.props)
        return (
            <Row>
                <Col sm={8}>
                    <div>
                        <Navbar style={{ backgroundColor: "#3346A8", height: "60px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)", width: "1029px" }}>

                            <ValidasiFrom />

                            <Link onClick={logout}><button style={{ backgroundColor: "#3346A8", border: "none" }}> <img src={log_out} style={{ width: "30px", height: "30px" }} /></button></Link>

                            {/* <p>Welcome <Link to="#" onClick={logout}>Logout</Link></p> */}

                        </Navbar>
                    </div>
                </Col>
                <Col sm={4}>
                    <Navbar style={{ backgroundColor: "#3346A8", height: "60px", marginLeft: "99px", width: "335px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)" }}>
                        <Navbar.Brand className="text-white" style={{ marginLeft: "50px" }} >

                        </Navbar.Brand>

                        <Button data-toggle="modal" data-target="#exampleModal">CheckOut  < span class="badge badge-primary">{this.props.cart.length}</span></Button>
                        {/* onClick={this.onSubmit} */}
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">CheckOut</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        {cart.map((cart) =>
                                            <div className="row">
                                                <div className="col-4" style={{ display: 'inline' }}>
                                                    <p style={{ display: 'inline' }}>| {cart.name}</p>
                                                </div>
                                                <div className="col-4" style={{ display: 'inline' }}>
                                                    <p style={{ display: 'inline' }}>   <NumberFormat value={cart.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />,-</p>
                                                    <p style={{ display: 'inline' }}>  x{cart.qty}</p>

                                                </div>
                                            </div>
                                        )}
                                        <div style={{ marginTop: 30 }}>
                                            <h5>Total :
                                            <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />,-

                                            </h5>

                                        </div>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.onSubmit}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Navbar>
                </Col>
            </Row >

        )
    }
}
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        products: state.products.products,
        categorys: state.categorys.categorys,
        pagination: state.products.pagination,
        cart: state.cart.cart,
        total: state.cart.total
    }
}

export default connect(mapStateToProps)(NavbarPage);