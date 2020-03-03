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
// import ModalDel from './ModalDel'

class ProductAdm extends Component {
    state = {
        name: '',
        description: '',
        image: '',
        price: 0,
        stock: 0,
        id_category: '0',
        show: false,
        selectProduct: null,
        selectProductDelete: null
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
        console.log("lqwekqwlje")

        let data = new FormData()

        data.append("name", this.state.name)
        data.append("description", this.state.description)
        data.append("image", this.state.image)
        data.append("price", this.state.price)
        data.append("stock", this.state.stock)
        data.append("id_category", this.state.id_category)
        console.log(this.state.id_category)
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
    handleShow = () => {
        this.setState({
            show: true
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    // modal


    // delete
    onSelectProductDelete = (product) => {
        this.setState({
            selectProductDelete: product,
            showDelete: true
        })
    }

    // deleteProduct = (productId) => {
    //     this.props.dispatch(deleteProduct(productId))

    //     // console.log(productId)
    // }
    // delete

    render() {
        const { products } = this.props;
        console.log(products);
        return (
            <Row>
                <Col sm={8} className="p-4">
                    <Row>
                        <Col>

                            <div style={{ maxWidth: "350px" }}>

                                <div class="col-1 col-md-1 scrollbar scrollbar-primary" className="" style={{
                                    display: "flex", flexWrap: "wrap", padding: "10px", width: "870px", overflowY: "scroll", position: "relative", height: "400px"
                                }}>

                                    {products.map((product, index) =>
                                        <div key={index} style={{
                                            width: "172px",
                                            height: "300px", backgroundColor: "white", marginTop: "30px", marginLeft: "30px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", padding: "5px"
                                        }}>
                                            <img src={product.image} style={{ width: "145px", height: "145px", marginLeft: "15px" }} />
                                            <h6 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h6>
                                            <hr />
                                            <Row>
                                                <Col style={{ marginLeft: "5px", marginTop: "-15px" }}>RP.{product.price}</Col>
                                                <Col style={{ fontSize: "10px", marginTop: "-7px" }}>Stock :{product.stock}</Col>
                                            </Row>
                                            <h6 style={{ marginLeft: "30px", marginTop: "2px" }}>{product.id_category}</h6>

                                            <Button style={{ backgroundColor: "#28F555", marginLeft: "12px", marginTop: "8px", width: "135px" }}><img src={ord} style={{ width: "15px", height: "15px" }} /></Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Col>


                    </Row>
                </Col >
            </Row >
        )
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps)(ProductAdm);