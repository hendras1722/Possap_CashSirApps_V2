import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { updateCategory } from '../redux/actions/Category';

class ModalEditCategory extends Component {
    state = {
        name: '',
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

        const idCategorys = this.props.idCategory
        let data = {
            name_category: this.state.name_category
        }

        console.log(this.state)
        this.props.dispatch(updateCategory(idCategorys, data));
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
                            <Form.Control type="text" name="name_category" onChange={this.onChange} />
                        </Form.Group>

                        <Button variant="primary" size="sm" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

export default connect()(ModalEditCategory);