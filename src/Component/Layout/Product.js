import React, { Component } from 'react'
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

    paginationProduct = (event) => {
        console.log(event.target.id)
        this.props.dispatch(paginationProduct(event.target.id))
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


    // delete
    onSelectProductDelete = (product) => {
        this.setState({
            selectProductDelete: product,
            showDelete: true
        })
    }

    render() {
        const { products, categorys, pagination } = this.props;
        console.log(this.props);
        return (
            <Row >
                <Col sm={10} className="p-4">
                    <Row>
                        <Col>

                            <div style={{ maxWidth: "350px" }}>
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination" style={{ marginLeft: "50px" }}>
                                        <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                        {pagination.map((pagination) => (
                                            <li class="page-item" key={pagination}><a class="page-link" onClick={this.paginationProduct} id={pagination}>{pagination}</a></li>
                                        ))}
                                        <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                                <div class="col-1 col-md-1 scrollbar scrollbar-primary" className="" style={{
                                    display: "flex", flexWrap: "wrap", width: "600px", position: "relative", height: "400px", overflowY: "scroll"
                                }}>

                                    {products.map((product, index) =>
                                        <div key={index} style={{
                                            width: "180px",
                                            height: "320px", backgroundColor: "white", marginTop: "10px", marginLeft: "10px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", padding: "5px", borderRadius: "15px"
                                        }}>
                                            <img src={product.image} style={{ width: "145px", height: "145px", marginLeft: "15px" }} />
                                            <h6 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h6>
                                            <hr />
                                            <Row>
                                                <Col style={{ marginLeft: "5px", marginTop: "-15px" }}><p style={{ textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Rp.{product.price}</p></Col>
                                                <Col style={{ fontSize: "10px", marginTop: "-7px" }}><div>Stock :{product.stock} </div></Col>
                                            </Row>
                                            <h6 style={{ marginLeft: "30px", marginTop: "2px" }}>{product.id_category}</h6>

                                            <Button onClick={() => this.handleShowDelete(product.id)} style={{ marginLeft: "5px", backgroundColor: "#F52929", marginTop: "8px" }}><img src={rmv} style={{ width: "15px", height: "15px" }} /></Button>

                                            {/* EDit */}
                                            <Button onClick={this.handleShowEdit} value={product.id} style={{ marginLeft: "12px", backgroundColor: "#F0F429", marginTop: "8px" }}><img src={edt} style={{ width: "15px", height: "15px" }} /></Button>


                                            <Button onClick={() => (this.onAddChart(product))} style={{ backgroundColor: "#28F555", marginLeft: "12px", marginTop: "8px" }}><img src={ord} style={{ width: "15px", height: "15px" }} /></Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </Col>

                        <ModalDelete show={this.state.showDelete} onHide={this.handleCloseDelete} onClick={this.onSelectProductDelete} id={this.state.id} />


                        {/* modal edit */}
                        <ModalEdit show={this.state.showEdit} onHide={this.handleCloseEdit} onClick={this.onSelectProductEdit} idProduct={this.state.idProduct} />

                        <Col style={{ marginLeft: "250px", width: "200px" }}>
                            <div style={{ marginLeft: "-70px" }}>
                                <h4 style={{ marginLeft: "60px", marginTop: "50px", marginBottom: "20px" }}>Add Product</h4>
                                <form onSubmit={this.onSubmit}>
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

                                        <select class="custom-select mr-sm-2" name="id_category" id="inlineFormCustomSelect" onChange={this.onChange} value={this.state.id_category} style={{ width: "400px" }} required>

                                            <option >Choose...</option>
                                            {categorys.map((category, index) =>
                                                <option key={index} value={category.id}>{category.name}</option>
                                            )}
                                        </select>

                                    </div>
                                    <button type="submit" class="btn btn-primary" style={{ width: "400px" }}>Submit</button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Col >
            </Row >
        )
    }
}

const mapStateToProps = (state) => {
    console.log(mapStateToProps)
    return {
        products: state.products.products,
        categorys: state.categorys.categorys,
        pagination: state.products.pagination

    }
}

export default connect(mapStateToProps)(Product);