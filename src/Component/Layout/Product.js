import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import rmv from '../img/remove.png'
import edt from '../img/edit.png'
import ord from '../img/order.png'
import re from '../img/empty.png'
import { getProducts } from '../redux/actions/Product'
import { postProducts } from '../redux/actions/Product'
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'
import { addCart } from '../redux/actions/carts'
import { paginationProduct } from '../redux/actions/Product'
// var numeral = require('numeral');
import NumberFormat from 'react-number-format';

class Product extends Component {
    state = {
        products: [],
        id: '',
        name: '',
        description: '',
        image: '',
        price: 1,
        stock: 1,
        name_category: '0',
        showEdit: false,
        showDelete: false,
        selectProductEdit: null,
        selectProductDelete: null,

    }
    onAddChart = (product) => {

        product.qty = 1
        this.props.dispatch(addCart(product))
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

    paginationProduct = async (event) => {
        console.log(event.target.id)
        await this.props.dispatch(paginationProduct(event.target.id))
    }


    getProducts = async () => {
        await this.props.dispatch(getProducts())
    }


    async componentDidMount() {
        if (!localStorage.getItem('isAuth')) {
            this.props.history.push('/login');
        }
        await this.getProducts();
    }


    // modal
    handleShowEdit = (e) => {
        console.log(e)
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
    onSelectProductEdit = (e) => {
        // console.log("kelqwk")
        // console.log(e.target.value)
        this.setState({
            // selectProductEdit: product,
            showEdit: true
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

    render() {
        const { products, categorys, pagination, hide, cart, total } = this.props;
        // console.log(this.props.categorys);
        console.log(cart.name)
        return (
            <Row >
                <Col sm={10} className="p-4">
                    <Row>
                        <Col>
                            <div style={{ maxWidth: "350px" }}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination" style={{ marginLeft: "50px" }}>
                                        {/* <li class="page-item"><a class="page-link" href="#">Previous</a></li> */}
                                        {/* {pagination.map((pagination) => (
                                            <li class="page-item" key={pagination}><a class="page-link" onClick={this.paginationProduct} id={pagination}>{pagination}</a></li>
                                        ))} */}
                                        {/* <li class="page-item"><a class="page-link" href="#">Next</a></li> */}
                                    </ul>
                                </nav>
                                <div class="col-1 col-md-1 scrollbar scrollbar-primary" className="" style={{
                                    display: "flex", flexWrap: "wrap", width: "1000px", position: "relative", height: "400px", overflowY: "scroll"
                                }}>

                                    {products.map((product, index) =>
                                        <div key={index} style={{ width: "180px", height: "320px", backgroundColor: "white", marginTop: "10px", marginLeft: "10px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", padding: "5px", borderRadius: "15px", display: 'inline' }}>
                                            <img src={rmv} onClick={() => this.handleShowDelete(product.id)} style={{ width: "15px", height: "15px", position: 'absolute' }} hidden={hide} />
                                            <img src={edt} onClick={() => this.handleShowEdit(product.id)} value={product.id} style={{ width: "15px", height: "15px", position: 'absolute', marginLeft: "150px" }} hidden={hide} />
                                            <img src={product.image} style={{ width: "145px", height: "145px", marginLeft: "15px" }} />
                                            <h6 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h6>
                                            <div><p style={{ fontSize: 10, position: 'absolute', marginLeft: 120, marginTop: -10 }}>
                                                Stock :{product.stock}
                                            </p> </div>
                                            <hr />
                                            <Row>
                                                <Col style={{ marginLeft: "5px", marginTop: "-15px" }}><p style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }} > <NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />,-</p>
                                                </Col>

                                                <Col style={{ fontSize: "10px", marginTop: "-7px" }}></Col>
                                            </Row>
                                            <h6 style={{ marginLeft: "30px", marginTop: "2px" }}>{product.name_category}</h6>


                                            <Button onClick={() => (this.onAddChart(product))} style={{ backgroundColor: "#28F555", marginLeft: "12px", marginTop: "8px", width: "140px" }}><img src={ord} style={{ width: "15px", height: "15px" }} /></Button>
                                        </div>
                                    )}

                                </div>
                            </div>

                        </Col>
                        <Col style={{ marginLeft: 660 }} >
                            <img src={re} style={{ marginLeft: -20, width: "300px", height: "250px", position: 'absolute' }} />
                        </Col>
                        <ModalDelete show={this.state.showDelete} onHide={this.handleCloseDelete} onClick={this.onSelectProductDelete} id={this.state.id} />


                        {/* modal edit */}
                        <ModalEdit show={this.state.showEdit} onHide={this.handleCloseEdit} onClick={this.onSelectProductEdit} idProduct={this.state.idProduct} />


                    </Row>
                </Col >
            </Row >
        )
    }
}

const mapStateToProps = (state) => {
    console.log(mapStateToProps)
    return {
        hide: state.products.hide,
        products: state.products.products,
        categorys: state.categorys.categorys,
        pagination: state.products.pagination,
        cart: state.cart.cart,
        total: state.cart.total

    }
}

export default connect(mapStateToProps)(Product);