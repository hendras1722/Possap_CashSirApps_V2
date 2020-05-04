import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import { Button } from 'react-bootstrap'
import log_out from '../img/login.png'
import logocat from '../img/admin.png'
import { Link } from 'react-router-dom'
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
            if (localStorage.getItem('Status') === '1') {
                return (
                    <Fragment>
                        <Navbar.Brand className="text-white text-center">Admin</Navbar.Brand>
                        <Link to="/settings"><button style={{ backgroundColor: "#3346A8", border: "none" }}>
                            <img src={logocat} style={{ width: "30px", height: "30px" }} alt="admin" /></button>
                        </Link>

                    </Fragment>
                )
            }
            else if (localStorage.getItem('Status') === '2') {
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
            <>
                <div className="row">
                    <div className="col-sm-8 p-0">
                        <Navbar className="ml-2" style={{ backgroundColor: "#3346A8", height: "60px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)" }}>
                            <ValidasiFrom />
                            <Link to="/login" onClick={logout}><button style={{ backgroundColor: "#3346A8", border: "none" }}> <img src={log_out} style={{ width: "30px", height: "30px" }} alt="logout" /></button></Link>
                        </Navbar>
                    </div>
                    <div className="col-sm-4 p-0">

                        <Navbar style={{ backgroundColor: "#3346A8", height: "60px", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.5)" }}>
                            <div>
                                <Button data-toggle="modal" data-target="#exampleModal">CheckOut  < span className="badge badge-primary">{this.props.cart.length}</span></Button>
                            </div>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">CheckOut</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
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
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.onSubmit}>Save changes</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Navbar>
                    </div>
                </div>

            </>
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