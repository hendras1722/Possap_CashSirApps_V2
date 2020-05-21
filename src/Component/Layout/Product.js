import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import ord from '../img/order.png'
import { getProducts } from '../redux/actions/Product'
import { postProducts } from '../redux/actions/Product'
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap'
import ModalDelete from './ModalDelete'
import ModalEdit from './ModalEdit'
import { addCart } from '../redux/actions/carts'
import { paginationProduct } from '../redux/actions/Product'
import { Link } from 'react-router-dom';
import numeral from 'numeral'
import ContactSkeletonLoading from './loading';

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
        selectProductEdit: [],
        selectProductDelete: null,
        loading: true
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
        await this.props.dispatch(paginationProduct(event.target.id))
    }


    getProducts = async () => {
        this.setState({
            loading: false
        })
        await this.props.dispatch(getProducts())
    }

    async componentWillMount() {
        await this.getProducts();

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
        this.setState({
            selectProductEdit: product,
            showEdit: true
        })
    }

    // modal
    handleShowDelete = (id) => {
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
        const { products, pagination } = this.props;
        console.log("ini porps", this.props.products)
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-lg-12">
                        <div >
                            <nav aria-label="Page navigation example">
                                <ul className="pagination" style={{ marginLeft: "50px" }}>

                                    {this.props.pagination && pagination.map((pagination) => (
                                        <li className="page-item" key={pagination}>
                                            <Link className="page-link" onClick={this.paginationProduct} id={pagination}>{pagination}</Link>
                                        </li>
                                    ))}

                                </ul>
                            </nav>
                            <div style={{
                                display: "flex", flexWrap: "wrap", position: "relative", height: "350px", width: '90%'
                            }}>
                                {this.props.products.length === 0 && this.props.pagination.length === 0 ?
                                    (
                                        <>
                                            <ContactSkeletonLoading />
                                            <ContactSkeletonLoading />
                                            <ContactSkeletonLoading />
                                            <ContactSkeletonLoading />
                                            <ContactSkeletonLoading />
                                        </>
                                    ) : (
                                        <>
                                            {products.map((product, index) =>
                                                <div key={index} style={{ width: "180px", height: "320px", backgroundColor: "white", marginTop: "10px", marginLeft: "10px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", padding: "5px", borderRadius: "15px", display: 'inline' }}>
                                                    <img alt="prduct" src={product.image} style={{ width: "145px", height: "145px", marginLeft: "15px" }} />
                                                    <h6 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h6>
                                                    <div><p style={{ fontSize: 10, position: 'absolute', marginLeft: 120, marginTop: -10 }}>
                                                        Stock :{product.stock}
                                                    </p> </div>
                                                    <hr />
                                                    <Row>
                                                        <Col style={{ marginLeft: "5px", marginTop: "-15px" }}><p style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }} />
                                                            <p style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{numeral(`${product.price}`).format('0a')}</p>
                                                        </Col>

                                                        <Col style={{ fontSize: "10px", marginTop: "-7px" }}></Col>
                                                    </Row>
                                                    <h6 style={{ marginLeft: "30px", marginTop: "2px" }}>{product.name_category}</h6>


                                                    <Button onClick={() => (this.onAddChart(product))} style={{ backgroundColor: "#28F555", marginLeft: "12px", marginTop: "8px", width: "140px" }}><img alt="orderIcon" src={ord} style={{ width: "15px", height: "15px" }} /></Button>
                                                </div>
                                            )
                                            }
                                        </>
                                    )}
                                {this.props.products.length === 0 && this.props.pagination.length === 1 ? (
                                    <div style={{ display: "flex", marginLeft: '300px', alignItems: 'center', justifyContent: 'center' }}>
                                        <h2>Product Not Found</h2>
                                    </div>
                                ) : (
                                        <>

                                        </>
                                    )}

                                <ModalDelete show={this.state.showDelete} onHide={this.handleCloseDelete} onClick={this.onSelectProductDelete} id={this.state.id} />

                                {/* modal edit */}
                                <ModalEdit show={this.state.showEdit} onHide={this.handleCloseEdit} onClick={this.selectProductEdit} idProduct={this.state.idProduct} products={this.selectProductEdit} />

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    console.log("woy", state)
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