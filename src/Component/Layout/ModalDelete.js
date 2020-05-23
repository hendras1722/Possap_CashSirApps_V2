import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { deleteProducts } from '../redux/actions/Product';

const ModalDelete = (props) => {
    const { show, onHide, dispatch, id } = props;
    // console.log(props)


    const onCancelHandle = (event) => {
        event.preventDefault();
        onHide();
    }

    const onDeleteHandle = async (event) => {
        event.preventDefault();

        await dispatch(deleteProducts(id));
        onHide();
    }

    return (

        <Modal show={show} onHide={onHide} variant="lg">
            <Modal.Header>
                <p>Apakah Anda Yakin Ingin Menghapus ini ?</p>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" size="sm" onClick={onCancelHandle} style={{ marginRight: "10px" }}>Cancel</Button>
                <Button variant="danger" size="sm" onClick={onDeleteHandle} >Delete</Button>
            </Modal.Body>
        </Modal>
    )
}

export default connect()(ModalDelete);