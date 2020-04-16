import React, { Component } from 'react';
import { Modal, Form } from 'react-bootstrap';

import { connect } from 'react-redux';
import { postProducts } from '../redux/actions/Product';

class ModalEdit extends Component {
    state = {
        id_category: 0,
        name: '',
        price: 0,
        stock: 0,
        description: '',
        image: '',
        showAdd: false
    }

    handleShowAdd = (e) => {
        // console.log(e)
        this.setState({
            idProduct: e.target.value,
            showAdd: true
        })
    }

    handleCloseAdd = () => {
        this.setState({
            showAdd: false
        })
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

    onSubmit = async (e) => {
        e.preventDefault();
        // console.log("lqwekqwlje")

        let data = new FormData()

        data.append("name", this.state.name)
        data.append("description", this.state.description)
        data.append("image", this.state.image)
        data.append("price", this.state.price)
        data.append("stock", this.state.stock)
        data.append("id_category", this.state.id_category)
        console.log(this.state.name_category)
        // console.log(formData.append)

        await this.props.dispatch(postProducts(data));
    }


    render() {
        const { categorys } = this.props;
        // console.log(this.props)
        const { show, onHide } = this.props;
        return (
            <Modal show={show} onHide={onHide} variant="lg">
                <Modal.Header>
                    <p>Add Product</p>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmit} onHide={this.handleCloseAdd}>
                        <div class="form-group">
                            <input type="text" class="form-control" name="name" id="exampleInputName1" placeholder="Enter Name Product" onChange={this.onChange} style={{ width: "400px" }} required />
                            <Form.Control.Feedback type="invalid">

                            </Form.Control.Feedback>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" name="description" id="exampleInputDesctiption" placeholder="Enter Description Product" onChange={this.onChange} style={{ width: "400px" }} required />
                        </div>
                        <div class="form-group">
                            <input type="file" class="form-control-file" name="image" id="exampleFormControlFile1" onChange={this.onChangeImageHandler} style={{ width: "400px" }} required />
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" name="price" id="exampleInputPrice" placeholder="Enter Price Product" onChange={this.onChange} pattern="\d*" title="Numbers only, please." min="1" max="1000000" style={{ width: "400px" }} required />
                        </div>
                        <div class="form-group">
                            <input type="number" class="form-control" name="stock" id="exampleInputStock" placeholder="Enter Stock Product" onChange={this.onChange} pattern="\d*" title="Numbers only, please." min="1" max="300" style={{ width: "400px" }} required />
                        </div>
                        <div class="form-group">
                            <select class="custom-select mr-sm-2" name="id_category" id="inlineFormCustomSelect" onChange={this.onChange} value={this.state.name_category} style={{ width: "400px" }} required>
                                <option >Choose...</option>
                                {categorys.map((category, index) =>
                                    <option key={index} value={category.id}>{category.name_category}</option>
                                )}
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary" style={{ width: "400px" }} >Submit</button>
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        categorys: state.categorys.categorys
    }
}

export default connect(mapStateToProps)(ModalEdit);