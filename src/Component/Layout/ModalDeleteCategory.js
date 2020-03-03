import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { deleteCategory } from '../redux/actions/Category';

const ModalDelete = (props) => {
    const { show, onHide, dispatch, id } = props;
    // console.log(props)


    const onCancelHandle = (event) => {
        event.preventDefault();
        onHide();
    }

    const onDeleteHandle = async (event) => {
        event.preventDefault();
        // console.log(this.state.value)

        await dispatch(deleteCategory(id));
        onHide();
        // console.log(deleteProducts)
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