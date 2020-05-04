import React, { Component, Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import rmv from '../img/remove.png'
import edt from '../img/edit.png'
import ord from '../img/order.png'
import { getProducts } from '../redux/actions/Product'
import { postProducts } from '../redux/actions/Product'
import { connect } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'
import { addCart } from '../redux/actions/carts'
import { paginationProduct } from '../redux/actions/Product'
import { addQty, reduceQty } from '../redux/actions/carts'


class Product extends Component {
    state = {
        products: [],
        id: '',
        name: '',
        description: '',
        image: '',
        price: 1,
        stock: 1,
        id_category: '0',
        showEdit: false,
        showDelete: false,
        selectProductEdit: null,
        selectProductDelete: null
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
        data.append("id_category", this.state.id_category)
        // console.log(this.state.id_category)
        // console.log(formData.append)

        this.props.dispatch(postProducts(data));
    }


    getProducts = async () => {
        await this.props.dispatch(getProducts())
    }


    componentDidMount() {
        this.getProducts();
    }

    // modal
    handleShowEdit = (e) => {
        // console.log(e)
        this.setState({
            idProduct: e.target.value,
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

    paginationProduct = (event) => {
        console.log(event.target.id)
        this.props.dispatch(paginationProduct(event.target.id))
    }

    // delete
    onSelectProductDelete = (product) => {
        this.setState({
            selectProductDelete: product,
            showDelete: true
        })
    }


    addQuantity = (id) => {

        this.props.dispatch(addQty(id))
    }

    componentWillReceiveProps() {
        console.log('will receive props')
    }

    reduceQuantity = (id, qty) => {
        if (qty > 1) {
            this.props.dispatch(reduceQty(id))
        }
    }


    render() {
        const { products, categorys, cart, pagination } = this.props;
        // console.log(products);
        return (
            <Row>
                <Col sm={8} className="p-4">
                    <Row>
                        <Col>

                            <div style={{ maxWidth: "350px" }}>

                                <div class="col-1 col-md-1 scrollbar scrollbar-primary" className="" style={{
                                    display: "flex", flexWrap: "wrap", padding: "10px", width: "980px", position: "relative", height: "400px"
                                }}>

                                    {products.map((product, index) =>
                                        <div key={index} style={{
                                            width: "180px",
                                            height: "320px", backgroundColor: "white", marginTop: "5px", marginLeft: "5px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", padding: "5px"
                                        }}>
                                            <img src={product.image} style={{ width: "145px", height: "145px", marginLeft: "15px" }} />
                                            <h6 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h6>
                                            <hr />
                                            <Row>
                                                <Col style={{ marginLeft: "5px", marginTop: "-15px" }}><p style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Rp.{product.price}</p></Col>
                                                <Col style={{ fontSize: "10px", marginTop: "-7px" }}><div>Stock :{product.stock} </div></Col>
                                            </Row>
                                            <h6 style={{ marginLeft: "30px", marginTop: "2px" }}>{product.id_category}</h6>

                                            <Button onClick={() => (this.onAddChart(product))} style={{ backgroundColor: "#28F555", marginLeft: "12px", marginTop: "8px", width: "140px" }}><img src={ord} style={{ width: "15px", height: "15px" }} /></Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    {pagination.map((pagination) => (
                                        <li class="page-item" key={pagination}><a class="page-link" onClick={this.paginationProduct} id={pagination}>{pagination}</a></li>
                                    ))}
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </Col>

                        <ModalDelete show={this.state.showDelete} onHide={this.handleCloseDelete} onClick={this.onSelectProductDelete} id={this.state.id} />


                        {/* modal edit */}
                        <ModalEdit show={this.state.showEdit} onHide={this.handleCloseEdit} onClick={this.onSelectProductEdit} idProduct={this.state.idProduct} />

                    </Row>
                </Col >
                <div>
                    <Col sm={4} style={{ marginLeft: "-14px", width: "500px", padding: "5px", marginTop: "20px" }} >
                        {cart.map((cart) =>
                            <Fragment>
                                <div style={{ width: "500px", marginTop: "20px" }}>
                                    <img src={cart.image} style={{ display: "inline", width: "100px", height: "100px", marginTop: "10px" }} />
                                    <h5 style={{ display: "inline", maginTop: "-10px" }}>{cart.name}</h5>
                                    <p style={{ display: "block", marginLeft: "100px", marginTop: "-30px" }}>Rp.{cart.price}</p>
                                    <div style={{ marginLeft: "250px", marginTop: "-50px" }}>
                                        <button className="btn btn-outline-primary mr-2" onClick={() => (this.reduceQuantity(cart.id, cart.qty))}>-</button>
                                        <input className="text-center mr-2" value={cart.qty} style={{ width: "30px", border: "none" }} />
                                        <button className="btn btn-outline-primary" onClick={() => (this.reduceQuantity(cart.id))}>+</button>
                                    </div>
                                </div>
                            </Fragment>
                        )}

                        <h1 style={{ display: "inline" }}>Total :</h1>
                        <h3 >Rp.</h3>

                        <button className="btn btn-primary" style={{ marginTop: "50px", width: "500px" }}>CheckOut</button>
                    </Col>
                </div>
            </Row >
        )
    }
}

const mapStateToProps = (state) => {
    console.log(mapStateToProps)
    return {
        products: state.products.products,
        categorys: state.categorys.categorys,
        pagination: state.products.pagination,
        cart: state.cart.cart

    }
}

export default connect(mapStateToProps)(Product);