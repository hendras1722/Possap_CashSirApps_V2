// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { addQty, reduceQty } from '../redux/actions/cart'

// class CartItem extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             cart: []
//         }
//     }

//     addQuantity = (id) => {
//         console.log(id)
//         this.props.dispatch(addQty(id))
//     }

//     componentWillReceiveProps() {
//         console.log('will receive props')
//     }

//     reduceQuantity = (id, stock) => {
//         if (stock > 1) {
//             this.props.dispatch(reduceQty(id))
//         }
//     }


//     render() {
//         const { cart } = this.props
//         return (
//             <>
//                 {cart.map((cart) =>
//                     <div className='row'>
//                         <div className='col-md-4'>
//                             <div><img style={{ height: '80px', width: '80px', marginLeft: '-14px' }} src={cart.image} /></div>

//                         </div>
//                         <div className='col-md-4'>
//                             <div className='row' style={{ marginLeft: '-15px' }}>{cart.name}</div>
//                             <div className='row' style={{ marginLeft: '-30px' }}>
//                                 <div className='col-md-3'><button onClick={() => (this.reduceQuantity(cart.id, cart.qty))}>-</button></div>
//                                 <div className='col-md-3' style={{ marginLeft: '10px' }}> {cart.qty} </div>
//                                 <div className='col-md-3'><button onClick={() => (this.addQuantity(cart.id))}>+</button></div>

//                             </div>
//                         </div>
//                         <div className='col-md-4'>
//                             {cart.price}
//                         </div>
//                     </div>
//                 )}
//             </>
//         )
//     }
// }
// const mapStateToProps = (state) => {

//     return {
//         cart: state.cart.cart
//     }
// }
// export default connect(mapStateToProps)(CartItem)
import React, { Component } from 'react';
import ItemCart from './CartItem';
import { Row, Col, Button, Modal } from 'react-bootstrap';

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            carts: [],
            total: null,
            show: false
        };
    }

    componentWillReceiveProps({ cart }) {

        const total = this.state.total + cart.price;
        cart.qty = 1;
        this.state.carts.push(cart);

        this.setState({
            carts: this.state.carts,
            total: total
        })

        console.log('will receive props')
    }

    onAddQty = (cart) => {
        cart.qty = cart.qty + 1;
        const total = this.state.total + cart.price

        this.setState(nextState => ({
            carts: nextState.carts,
            total: total
        }))
    }

    onReduceQty = (cart) => {
        if (cart.qty > 1) {
            cart.qty = cart.qty - 1;
            const total = this.state.total - cart.price;

            this.setState(nextState => ({
                carts: nextState.carts,
                total: total
            }))
        }
    }

    onDeleteItem = (cart) => {
        const filterCartArray = this.state.carts.filter(item => item !== cart);
        const totalItem = cart.price * cart.qty;
        const total = this.state.total - totalItem;

        this.setState({
            carts: filterCartArray,
            total: total
        })
    }

    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        const { carts } = this.state;
        console.log('render');
        // console.log(carts);
        const itemCart = carts.map((cart, index) => {
            return (
                <ItemCart cart={cart} key={index} addQty={this.onAddQty} reduceQty={this.onReduceQty} deleteItem={this.onDeleteItem} />
            )
        });
        const itemCheckout = carts.map((cart, index) => {
            return (
                <Row key={index}>
                    <Col>{cart.name} {cart.qty} x</Col>
                    <Col>Rp. {cart.qty * cart.price}</Col>
                </Row>
            );
        })

        return (
            <div>
                {carts.length ?
                    <div>
                        <div style={{ width: '100%', height: "620px" }}>
                            {itemCart}
                        </div>
                        <Row style={{ fontWeight: "bold" }}>
                            <Col sm={6} style={{ fontSize: "25px" }}>Total: </Col>
                            <Col sm={6} style={{ fontSize: "25px" }}>Rp. {this.state.total}</Col>
                        </Row>
                        <p style={{ marginTop: "10px", marginBottom: "10px" }}>* Belum Termasuk ppn</p>
                        <Row className="justify-content-md-center" style={{ marginBottom: "10px" }}>
                            <Col sm={12}>
                                <Button size="sm" variant="info" style={{ width: "100%" }} onClick={this.handleShow} >Checkout</Button>
                            </Col>
                        </Row>
                        <Row className="justify-content-md-center">
                            <Col sm={12}>
                                <Button size="sm" variant="info" style={{ width: "100%" }} >Cancel</Button>
                            </Col>
                        </Row>

                        <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
                            <Modal.Body>
                                <Row>
                                    <Col style={{ fontSize: "17px" }}>Checkout</Col>
                                    <Col style={{ fontSize: "17px" }}>Receipt no: #0102314321213</Col>
                                </Row>
                                <p style={{ marginBottom: "30px" }}>Cashier: Pevita Pearce</p>
                                {itemCheckout}
                                <p>Total: Rp. {this.state.total}</p>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                        </Button>
                                <Button variant="primary" onClick={this.handleClose}>
                                    Save Changes
                        </Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    : null}
            </div>
        )
    }
}

export default Cart;