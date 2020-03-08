import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Col, Row, Button, Form, FormControl, Tab, Tabs } from 'react-bootstrap'
import { getCategory } from '../redux/actions/Category'
import { connect } from 'react-redux';
import { searchCategory } from '../redux/actions/Category'
import { postCategory } from '../redux/actions/Category'
import { getUser } from '../redux/actions/user'
import { updateUser } from '../redux/actions/user'
import ModalDeleteUser from '../Layout/ModalDeleteUser'
import ModalEditUser from '../Layout/ModalEditUser'
import ModalDeleteCategory from '../Layout/ModalDeleteCategory'
import ModalEditCategory from '../Layout/ModalEditCategory'
import { postProducts } from '../redux/actions/Product'

class TableCategory extends Component {
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

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // add category
    onSubmit = (e) => {
        e.preventDefault();

        let data = {
            name: this.state.name
        }

        console.log(this.state)
        this.props.dispatch(postCategory(data));
    }


    // add User
    onSubmitUser = (e) => {
        e.preventDefault();

        let data = {
            name: this.state.name,
            email: this.state.email,
            level: this.state.level,
            password: this.state.password
        }

        console.log(this.state)
        this.props.dispatch(updateUser(data));
    }


    getCategory = async () => {
        await this.props.dispatch(getCategory())
    }

    getUser = async () => {
        await this.props.dispatch(getUser())
    }


    // search category
    searchCategory = (event) => {
        // console.log(event.target.value)
        this.props.dispatch(searchCategory(event.target.value));
    }

    // modal delete
    handleShowDelete = (id) => {
        console.log("sadas")
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
    onSelectProductDeleteUser = (category) => {
        this.setState({
            selectProductDelete: category,
            showDelete: true
        })
    }

    // modal delete user
    handleShowDeleteUser = (id) => {
        console.log("sadas")
        this.setState({
            id: id,
            showDeleteUser: true
        })
    }

    handleCloseDeleteUser = () => {
        this.setState({
            showDeleteUser: false
        })
    }


    //edit
    // modal
    handleShowEdit = (e) => {
        console.log("kasdkmasd")
        console.log(e.target.value)
        this.setState({
            idCategory: e.target.value,
            showEdit: true
        })
    }

    handleCloseEdit = () => {
        this.setState({
            showEdit: false
        })
    }


    onSelectProductEdit = (e) => {
        // console.log("kelqwk")
        // console.log(e.target.value)
        this.setState({
            // selectProductEdit: product,
            showEdit: true
        })
    }
    //edit

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

    componentDidMount() {
        this.getCategory();
        this.getUser();
    }

    //update

    // modal
    handleShowUpdate = (e) => {
        console.log(e.target.value)
        this.setState({
            idUser: e.target.value,
            showUpdate: true
        })
    }

    handleCloseUpdate = () => {
        this.setState({
            showUpdate: false
        })
    }


    // update
    onSelectProductUpdate = (product) => {
        this.setState({
            selectProductUpdate: product,
            showUpdate: true
        })
    }

    // post
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



    render() {
        const { categorys, users } = this.props;
        return (
            <div className="container p-5">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Category">
                        <Row>
                            <Col>
                                <Table striped bordered hover style={{ width: "500px" }}>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Category</th>
                                            <th>
                                                <Form inline>
                                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchCategory} />
                                                </Form>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categorys.map((category, index) =>
                                            <tr key={index}>
                                                <td>{category.id}</td>
                                                <td>{category.name}</td>
                                                <td><div style={{ marginLeft: "50px" }}><Button variant="warning" size="sm" onClick={this.handleShowEdit} value={category.id}>Edit</Button> - <Button variant="danger" size="sm" onClick={() => this.handleShowDelete(category.id)} >Delete</Button></div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>

                            <ModalDeleteCategory show={this.state.showDelete} onHide={this.handleCloseDelete} onClick={this.onSelectProductDelete} id={this.state.id} />

                            {/* //edit */}
                            <ModalEditCategory show={this.state.showEdit} onHide={this.handleCloseEdit} onClick={this.onSelectProductEdit} idCategory={this.state.idCategory} />

                            <Col>
                                <h3 style={{ marginLeft: "150px", marginTop: "10px" }}>ADD Category</h3>
                                <br />
                                <form onSubmit={this.onSubmit}>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="name" id="exampleInputName1" placeholder="Enter Category" onChange={this.onChange} required />
                                    </div>
                                    <button type="submit" class="btn btn-primary" style={{ width: "507px" }}>Submit</button>
                                </form>
                            </Col>
                        </Row>
                    </Tab>

                    <Tab eventKey="profile" title="Administrator">
                        <Row>
                            <Col>
                                <Table striped bordered hover style={{ width: "500px" }}>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>name</th>
                                            <th>email</th>
                                            <th>level</th>
                                            <th>
                                                <Form inline>
                                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchCategory} />
                                                </Form>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) =>
                                            <tr>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.level}</td>
                                                <td><div style={{ marginLeft: "50px" }}><Button variant="warning" size="sm" onClick={this.handleShowUpdate} value={user.id}>Edit</Button> - <Button variant="danger" size="sm" onClick={() => this.handleShowDeleteUser(user.id)} >Delete</Button></div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>

                            <ModalDeleteUser show={this.state.showDeleteUser} onHide={this.handleCloseDeleteUser} onClick={this.onSelectProductDeleteUser} id={this.state.id} />

                            {/* //edit */}
                            <ModalEditUser show={this.state.showUpdate} onHide={this.handleCloseUpdate} onClick={this.onSelectProductUpdate} idUser={this.state.idUser} />

                            <Col>
                                <h3 style={{ marginLeft: "150px", marginTop: "10px" }}>ADD USER</h3>
                                <br />
                                <form onSubmit={this.onSubmitUser}>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="name" id="exampleInputName1" placeholder="Enter Name" onChange={this.onChange} style={{ width: "400px" }} required />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="email" id="exampleInputName1" placeholder="Enter email" onChange={this.onChange} style={{ width: "400px" }} required />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="level" id="exampleInputName1" placeholder="Enter level" onChange={this.onChange} style={{ width: "400px" }} required />
                                    </div>

                                    <div class="form-group">
                                        <input type="password" class="form-control" name="password" id="exampleInputName1" placeholder="Enter password" onChange={this.onChange} style={{ width: "400px" }} required />
                                    </div>
                                    <button type="submit" class="btn btn-primary" style={{ width: "400px" }}>Submit</button>
                                </form>
                            </Col>
                        </Row>
                    </Tab>

                    <Tab eventKey="submit" title="Submit">
                        <Row>
                            <Col>
                                <Table striped bordered hover style={{ width: "500px" }}>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>name</th>
                                            <th>email</th>
                                            <th>level</th>
                                            <th>
                                                <Form inline>
                                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchCategory} />
                                                </Form>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) =>
                                            <tr>
                                                <td>{user.id}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.level}</td>
                                                <td><div style={{ marginLeft: "50px" }}><Button variant="warning" size="sm" onClick={this.handleShowUpdate} value={user.id}>Edit</Button> - <Button variant="danger" size="sm" onClick={() => this.handleShowDeleteUser(user.id)} >Delete</Button></div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>

                            <ModalDeleteUser show={this.state.showDeleteUser} onHide={this.handleCloseDeleteUser} onClick={this.onSelectProductDeleteUser} id={this.state.id} />

                            {/* //edit */}
                            <ModalEditUser show={this.state.showUpdate} onHide={this.handleCloseUpdate} onClick={this.onSelectProductUpdate} idUser={this.state.idUser} />

                            <Col>
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
                    </Tab>
                </Tabs>

            </div>
        )
    }
}


const searchStateToProps = (state) => {
    return {
        categorys: state.categorys.categorys,
        users: state.users.users
    }
}

export default connect(searchStateToProps)(TableCategory);