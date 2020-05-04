import React, { Component } from 'react'
import { Table, Col, Row, Button, Form, FormControl, Tab, Tabs } from 'react-bootstrap'
import { getProducts, postProducts } from '../redux/actions/Product'
import { connect } from 'react-redux';
import ModalEdit from '../Layout/ModalEdit'
import ModalDelete from '../Layout/ModalDelete'
import ModalAdd from '../Layout/ModalAdd'
import { searchProduct } from "../redux/actions/Product";
import { paginationProduct } from '../redux/actions/Product'
import { Link } from 'react-router-dom';

class AddProduct extends Component {
    state = {
        showEdit: false,
        showDelete: false,
        selectProductEdit: null,
        selectProductDelete: null,
        searchName: "",
        idCategory: "",
        paginationProduct: ""
    }

    paginationProduct = async (event) => {
        await this.props.dispatch(paginationProduct(event.target.id))
    }


    searchProduct = (event) => {
        this.setState({
            searchName: event.target.value,
        })
        this.props.dispatch(searchProduct(event.target.value, this.state.idCategory, this.state.paginationProduct));
    }

    // modal
    handleShowEdit = (e) => {
        this.setState({
            idProduct: e,
            showEdit: true
        })
    }

    handleCloseEdit = () => {
        this.setState({
            showEdit: false
        })
    }


    // delete
    onSelectProductEdit = (product) => {
        console.log("woy", product)
        this.setState({
            selectProductEdit: product,
            showEdit: true
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    onChangeImageHandler = (e) => {
        this.setState({ image: e.target.files[0] })
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log("lqwekqwlje")

        let data = new FormData()

        data.append("name", this.state.name)
        data.append("description", this.state.description)
        data.append("image", this.state.image)
        data.append("price", this.state.price)
        data.append("stock", this.state.stock)
        data.append("name_category", this.state.name_category)
        console.log(this.state.name_category)
        // console.log(formData.append)

        this.props.dispatch(postProducts(data));
    }

    // modal add
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

    // modal
    handleShowDelete = (id) => {
        // console.log(e.target.value)
        this.setState({
            id: id,
            showDelete: true
        })
    }

    handleCloseDelete = () => {
        this.setState({
            showDelete: false
        })
    }


    // delete
    onSelectProductDelete = (product) => {
        this.setState({
            selectProductDelete: product,
            showDelete: true
        })
    }

    getProduct = async () => {
        await this.props.dispatch(getProducts())
    }

    async componentDidMount() {
        await this.getProduct()
    }

    render() {
        const { products, pagination } = this.props
        console.log('products', this.props.pagination)
        return (
            <div>
                <Table striped bordered hover style={{ width: "500px" }}>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Product</th>
                            <th>Image</th>
                            <th>Stock</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchProduct} style=
                                        {{ width: 200 }} />
                                </Form>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) =>
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td><img src={item.image} style={{ width: "50px", height: "50px" }} /></td>
                                <td>{item.stock}</td>
                                <td>{item.price}</td>
                                <td>{item.name_category}</td>
                                <td><div style={{ marginLeft: "10px" }}>
                                    <Button variant="success" size="sm" onClick={this.handleShowAdd}>Add</Button> - <Button variant="warning" size="sm" onClick={() => this.handleShowEdit(item.id)} value={item.id}>Edit</Button> - <Button variant="danger" size="sm" onClick={() => this.handleShowDelete(item.id)} >Delete</Button>
                                </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                    <ul className="pagination" style={{ marginLeft: "50px" }}>

                        {this.props.pagination && pagination.map((pagination) => (
                            <li className="page-item" key={pagination}>
                                <Link className="page-link" onClick={this.paginationProduct} id={pagination}>{pagination}</Link>
                            </li>
                        ))}

                    </ul>
                    <ModalDelete show={this.state.showDelete} onHide={this.handleCloseDelete} onClick={this.onSelectProductDelete} id={this.state.id} />
                    <ModalAdd show={this.state.showAdd} onHide={this.handleCloseAdd} />
                    {/* modal edit */}
                    <ModalEdit show={this.state.showEdit} onHide={this.handleCloseEdit} onClick={this.selectProductEdit} idProduct={this.state.idProduct} products={this.selectProductEdit} />
                </Table>
            </div>
        )
    }
}

const searchStateToProps = (state) => {
    console.log("ini produk", state)
    return {
        products: state.products.products,
        pagination: state.products.pagination,
    }
}

export default connect(searchStateToProps)(AddProduct);