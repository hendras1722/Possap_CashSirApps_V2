import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { updateProduct } from '../redux/actions/Product';

class ModalEdit extends Component {
    state = {
        name_category: 0,
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
        // console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log(this.state)

        const idGet = this.props.idProduct;

        let data = new FormData();
        data.append("name", this.state.name);
        data.append("description", this.state.description);
        data.append("image", this.state.image);
        data.append("price", this.state.price);
        data.append("stock", this.state.stock);
        data.append("name_category", this.state.name_category);

        this.props.dispatch(updateProduct(idGet, data));
        this.props.onHide()

        console.log(data)
    }

    render() {
        const { categorys } = this.props;
        // console.log(this.state.name_category)
        const { show, onHide } = this.props;
        return (
            <Modal show={show} onHide={onHide} variant="lg">
                <Modal.Header>
                    <p>Edit Product</p>
                </Modal.Header>
                <Modal.Body>
                    <Form >
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
                        <select class="custom-select mr-sm-2" name="name_category" id="inlineFormCustomSelect" onChange={this.onChange} value={this.state.name_category} required>

                            <option >Choose...</option>
                            {categorys.map((category, index) =>
                                <option key={index} value={category.id}>{category.name_category}</option>
                            )}
                        </select>
                        <Button variant="primary" size="sm" type="submit" className="mt-3" onClick={this.onSubmit}>Save</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }

}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        products: state.products.products,
        categorys: state.categorys.categorys
    }
}

export default connect(mapStateToProps)(ModalEdit);