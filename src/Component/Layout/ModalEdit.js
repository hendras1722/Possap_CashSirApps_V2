import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { updateProduct } from '../redux/actions/Product';

class ModalEdit extends Component {
    state = {
        id_category: 0,
        name: '',
        price: 0,
        stock: 0,
        description: '',
        image: ''
    }

    onChangeImageHandler = (event) => {
        this.setState({
            image: event.target.files[0]
        })
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
        // console.log(this.props)
        const product = this.props
        console.log(this.props.idProduct)
        const idGet = this.props.idProduct;
        let data = new FormData();
        data.append("name", this.state.name);
        data.append("description", this.state.description);
        data.append("image", this.state.image);
        data.append("price", this.state.price);
        data.append("stock", this.state.stock);
        data.append("id_category", this.state.id_category);

        this.props.dispatch(updateProduct(idGet, data));
        this.props.onHide()

        // console.log(idGet)
    }

    render() {
        // console.log(this.props)
        const { show, onHide, ...product } = this.props;
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
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" name="description" onChange={this.onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="image" onChange={this.onChangeImageHandler} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" name="price" onChange={this.onChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="number" name="stock" onChange={this.onChange} />
                        </Form.Group>

                        <select id="inputState" class="form-control" name="id_category" onChange={this.onChange} >
                            <option value={0} disabled>Choose...</option>
                            <option value={1}>microcontroller</option>
                            <option value={2}>komponen</option>
                        </select>
                        <Button variant="primary" size="sm" type="submit">Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

export default connect()(ModalEdit);