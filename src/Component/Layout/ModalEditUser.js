import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { updateUser } from '../redux/actions/user';

class ModalEditCategory extends Component {
    state = {
        name: '',
        email: '',
        level: '',
        id: ''
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        const idUsers = this.props.idUser
        let data = {
            name: this.state.name,
            email: this.state.email,
            Status: this.state.Status
        }

        // console.log(onsubmit)
        console.log(data)
        this.props.dispatch(updateUser(idUsers, data));
    }


    render() {
        // console.log(this.props)
        const { show, onHide } = this.props;
        return (
            <Modal show={show} onHide={onHide} variant="lg">
                <Modal.Header>
                    <p>Edit Product</p>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group>

                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" onChange={this.onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" name="email" onChange={this.onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Level</Form.Label>
                            <Form.Control type="number" name="Status" onChange={this.onChange} />
                        </Form.Group>

                        <Button variant="primary" size="sm" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

export default connect()(ModalEditCategory);