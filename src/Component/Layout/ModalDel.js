import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { deleteProducts } from '../redux/actions/Product';

class ModalDel extends Component {

     ({ product, show, onHide, dispatch }) = props;
onCancelHandle = (event) => {
    event.preventDefault();
    onHide();
}

onDeleteHandle = async (event) => {
    event.preventDefault();
    console.log(this.state.value)
    this.setState({
        id: this.state.value
    })
    await dispatch(deleteProducts(product.id));
    onHide();

}

render() {
    return (
        <Modal show={show} onHide={onHide} variant="lg">
            <Modal.Header>
                <p>Apakah Anda Yakin Ingin Menghapus ini ?</p>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" size="sm" onClick={this.onCancelHandle} style={{ marginRight: "10px" }}>Cancel</Button>
                <Button variant="danger" size="sm" onClick={this.onDeleteHandle} value={product.id}>Delete</Button>
            </Modal.Body>
        </Modal>
    )
}
}

export default ModalDel;