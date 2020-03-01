import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import rmv from '../img/remove.png'
import edt from '../img/edit.png'
import ord from '../img/order.png'
import { getProducts } from '../redux/actions/Product'
import { postProducts } from '../redux/actions/Product'
import { connect } from 'react-redux';

class Part2 extends Component {
    state = {
        name: "",
        description: "",
        image: "",
        price: "",
        stock: "",
        id_category: "0"
    }

    onChangeValue = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value

        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log("lqwekqwlje")

    }

    getProducts() {
        this.props.dispatch(getProducts())
    }

    postProducts() {
        this.props.dispatch(postProducts())
    }

    componentDidMount() {
        this.getProducts();
        this.postProducts();
    }
    render() {

        const { products } = this.props;
        console.log(products);
        return (
            <Row>
                <Col sm={8} className="p-4" >
                    <Row>
                        <Col>

                            <div style={{ maxWidth: "350px" }}>

                                <div class="col-1 col-md-1" className="" style={{
                                    display: "flex", flexWrap: "wrap", padding: "10px", width: "400px"
                                }}>

                                    {products.map((product, index) =>
                                        <div key={index} style={{
                                            width: "172px",
                                            height: "300px", backgroundColor: "white", marginTop: "5px", marginLeft: "5px", border: "1px solid rgba(0, 0, 0, 0.5)", boxSizing: "border-box", padding: "5px"
                                        }}>
                                            <img src={product.image} style={{ width: "145px", height: "145px", marginLeft: "15px" }} />
                                            <h6 style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</h6>
                                            <hr />
                                            <Row>
                                                <Col style={{ marginLeft: "5px", marginTop: "-15px" }}>RP.{product.price}</Col>
                                                <Col style={{ fontSize: "10px", marginTop: "10px", marginTop: "-7px" }}>Stock :{product.stock}</Col>
                                            </Row>
                                            <h6 style={{ marginLeft: "30px", marginTop: "2px" }}>{product.id_category}</h6>
                                            <Button style={{ marginLeft: "5px", backgroundColor: "#F52929", marginTop: "8px" }}><img src={rmv} style={{ width: "15px", height: "15px" }} /></Button>
                                            <Button style={{ marginLeft: "12px", backgroundColor: "#F0F429", marginTop: "8px" }}><img src={edt} style={{ width: "15px", height: "15px" }} /></Button>
                                            <Button style={{ backgroundColor: "#28F555", marginLeft: "12px", marginTop: "8px" }}><img src={ord} style={{ width: "15px", height: "15px" }} /></Button>
                                        </div>
                                    )}

                                </div>


                            </div>

                        </Col>
                        <Col style={{ marginLeft: "-80px" }}>
                            <form onSubmit={this.onSubmit}>
                                <div class="form-group">
                                    <input type="text" class="form-control" name="name" id="exampleInputName1" placeholder="Enter Name Product" onChange={this.onChangeValue} />
                                </div>
                                <div class="form-group">
                                    <input type="text" class="form-control" name="description" id="exampleInputDesctiption" placeholder="Enter Description Product" onChange={this.onChangeValue} />
                                </div>
                                <div class="form-group">
                                    <input type="file" class="form-control-file" name="image" id="exampleFormControlFile1" onChange={this.onChangeValue} />
                                </div>
                                <div class="form-group">
                                    <input type="number" class="form-control" name="price" id="exampleInputEmail1" placeholder="Enter Price Product" onChange={this.onChangeValue} />
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control" name="stock" id="exampleInputEmail1" placeholder="Enter Stock Product" onChange={this.onChangeValue} />
                                </div>
                                <div class="form-group">
                                    <select class="custom-select mr-sm-2" name="name" id="inlineFormCustomSelect" onChange={this.onChangeValue}>
                                        <option selected>Choose...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                    </select>
                                </div>
                                <button type="submit" class="btn btn-primary">Submit</button>
                            </form>

                            {/* <Form class="needs-validation" onSubmit={this.onSubmit} novalidate>


                                <input type="text" class="form-control" name="name" id="validationCustom01" placeholder="Name Product" style={{ marginTop: "10px" }} onChange={this.onChangeValue} required />
                                <div class="invalid-feedback">
                                    Name is not valid
      </div>


                                <input type="text" class="form-control" name="description" id="validationCustom02" placeholder="Description" style={{ marginTop: "10px" }} onChange={this.onChangeValue} required />
                                <div class="invalid-feedback">
                                    Description is not valid
      </div>


                                <input type="file" class="form-control-file" name="image" id="exampleFormControlFile1" style={{ marginTop: "10px" }} onChange={this.onChangeValue} data-max-file-size="2M" />
                                <div class="invalid-feedback">
                                    Image is not valid
      </div>


                                <input type="number" name="price" class="form-control" id="validationCustom03" placeholder="Price" style={{ marginTop: "10px" }} onChange={this.onChangeValue} required />
                                <div class="invalid-feedback">
                                    Price is not valid
      </div>


                                <input type="number" name="stock" class="form-control" id="validationCustom01" placeholder="Stock" style={{ marginTop: "10px" }} onChange={this.onChangeValue} required />
                                <div class="invalid-feedback">
                                    Stock is not valid
      </div>


                                <select class="custom-select mr-sm-2" name="id_category" id="inlineFormCustomSelect" style={{ marginTop: "10px" }} onChange={this.onChangeValue} required >
                                    <option selected>Choose...</option>
                                    <option value={1}>One</option>
                                    <option value={2}>Two</option>
                                </select>
                                <div class="invalid-feedback">
                                    Category is not valid
      </div>

                                <button type="button" class="btn btn-primary">Primary</button>
                            </Form> */}
                        </Col>
                    </Row>
                </Col >
            </Row >
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        products: state.products.products
    }
}

export default connect(mapStateToProps)(Part2);