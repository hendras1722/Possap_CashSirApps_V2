import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { deleteUser } from '../redux/actions/user';

const ModalDeleteUser = (props) => {
    const { show, onHide, dispatch, id } = props;
    // console.log(props)


    const onCancelHandle = (event) => {
        event.preventDefault();
        onHide();
    }

    const onDeleteHandle = async (event) => {
        event.preventDefault();
        console.log(event)

        await dispatch(deleteUser(id));
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

export default connect()(ModalDeleteUser);