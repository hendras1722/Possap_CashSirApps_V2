import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { orderCheckout } from '../redux/actions/order'

const onSubmit = () => {
    const data = {
        idBuyer: parseInt(localStorage.getItem('id')),
        products: this.props.cart
    }
    this.props.dispatch(orderCheckout(data))
}

const ModalCheckOut = (props) => {
    const { show, onHide, dispatch, id } = props;
    // console.log(props)


    return (

        <Modal show={show} onHide={onHide} variant="lg">
            <Modal.Header>
                <p>Apakah Anda Yakin Ingin Menghapus ini ?</p>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" size="sm" style={{ marginRight: "10px" }}>Cancel</Button>
                <Button variant="danger" size="sm" onClick={onSubmit} >CheckOut</Button>
            </Modal.Body>
        </Modal>
    )
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
export default connect(mapStateToProps)(ModalCheckOut);