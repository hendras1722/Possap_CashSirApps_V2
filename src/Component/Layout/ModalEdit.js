import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { updateProduct } from '../redux/actions/Product';

class ModalEdit extends Component {
    state = {
        name: '',
        description: '',
        image: '',
        price: 0,
        stock: 0,
        id_category: ''
    }

    componentWillReceiveProps({ product }) {
        this.onSetValue(product);
    }

    onSetValue = (product) => {

        this.setState({
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            stock: product.stock,
            id_category: product.id_category
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const id = this.props.product.id;
        await this.props.dispatch(updateProduct(id, this.state));
        await this.props.onHide();
    }
    render() {
        const { show, onHide } = this.props;
        return (
            <Modal show={show} onHide={onHide} variant="lg">
                <Modal.Header>
                    <p>Edit Book</p>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmit}>
                        <div class="form-group">
                            <input type="text" class="form-control" name="name" id="exampleInputName1" placeholder="Enter Name Product" onChange={this.onChange} required />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
            </Form.Control.Feedback>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="description" id="exampleInputDesctiption" placeholder="Enter Description Product" onChange={this.onChange} required />
                        </div>
                        <div class="form-group">
                            <input type="file" class="form-control-file" name="image" id="exampleFormControlFile1" onChange={this.onChangeImageHandler} required />
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" name="price" id="exampleInputPrice" placeholder="Enter Price Product" onChange={this.onChange} pattern="\d*" title="Numbers only, please." required />
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" name="stock" id="exampleInputStock" placeholder="Enter Stock Product" onChange={this.onChange} pattern="\d*" title="Numbers only, please." required />
                        </div>
                        <div class="form-group">
                            <select onChange={this.onChangeHandler} name="id_category" className="custom-select" id="inputGroupSelect01" value={this.state.id_category}>
                                <option selected value={0} disabled>Choose...</option>
                                <option value={1}>Microcontroller</option>
                                <option value={2}>Komponen</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
}

export default connect()(ModalEdit);