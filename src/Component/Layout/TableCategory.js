import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Col, Row, Button, Form, FormControl, Tab, Tabs } from 'react-bootstrap'
import { getCategory } from '../redux/actions/Category'
import { connect } from 'react-redux';
import { searchCategory } from '../redux/actions/Category'
import { postCategory } from '../redux/actions/Category'
import { getUser } from '../redux/actions/user'
import { readCheckout } from '../redux/actions/order'
import { registerUser } from '../redux/actions/user'
import ModalDeleteUser from '../Layout/ModalDeleteUser'
import ModalEditUser from '../Layout/ModalEditUser'
import ModalDeleteCategory from '../Layout/ModalDeleteCategory'
import ModalEditCategory from '../Layout/ModalEditCategory'
import { Line } from 'react-chartjs-2'
import NumberFormat from 'react-number-format';

class TableCategory extends Component {
    state = {
        id: '',
        name: '',
        email: '',
        Status: '',
        password: '',
        name_category: '',
        showEdit: false,
        showDelete: false,
        selectProductEdit: null,
        selectProductDelete: null,
        products: []
    }


    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // add category
    onSubmitCategory = (e) => {
        e.preventDefault();

        let data = {
            name_category: this.state.name_category
        }

        console.log(data)
        this.props.dispatch(postCategory(data));
    }


    // add User
    onSubmitUser = async (e) => {
        e.preventDefault();

        let data = {
            name: this.state.name,
            email: this.state.email,
            Status: this.state.Status,
            password: this.state.password
        }

        // console.log(this.state)
        await this.props.dispatch(registerUser(data));
    }

    readCheckout = async () => {
        await this.props.dispatch(readCheckout())
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

    async componentDidMount() {
        await this.getCategory();
        await this.getUser();
        await this.readCheckout();
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



    render() {
        const { categorys, users, orders } = this.props;
        console.log(this.props.orders)
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
                                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchCategory} style=
                                                        {{ width: 200 }} />
                                                </Form>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categorys.map((category, index) =>
                                            <tr key={index}>
                                                <td>{category.id}</td>
                                                <td>{category.name_category}</td>
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
                                <form onSubmit={this.onSubmitCategory}>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="name_category" id="exampleInputName1" placeholder="Enter Category" onChange={this.onChange} style={{ width: "450px" }} required />
                                    </div>
                                    <button type="submit" class="btn btn-primary" style={{ width: "450px" }}>Submit</button>
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
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Status</th>
                                            <th>
                                                <Form inline>
                                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchCategory} style=
                                                        {{ width: 200 }} />
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
                                                <td>{user.name_level}</td>
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
                                        <input type="text" class="form-control" name="Status" id="exampleInputName1" placeholder="Enter level" onChange={this.onChange} style={{ width: "400px" }} required />
                                    </div>

                                    <div class="form-group">
                                        <input type="password" class="form-control" name="password" id="exampleInputName1" placeholder="Enter password" onChange={this.onChange} style={{ width: "400px" }} required />
                                    </div>
                                    <button type="submit" class="btn btn-primary" style={{ width: "400px" }}>Submit</button>
                                </form>
                            </Col>
                        </Row>
                    </Tab>

                    <Tab eventKey="History" title="History Cart">
                        <Row>
                            <Col>
                                <Table striped bordered hover style={{ width: "500px" }}>
                                    <thead>
                                        <tr>
                                            <th>id</th>
                                            <th>Nama Product</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Tanggal</th>
                                            {/* <th>
                                                <Form inline>
                                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.searchCategory} style=
                                                        {{ width: 200 }} />
                                                </Form>
                                            </th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) =>
                                            <tr key={index}>
                                                <td>{order.idBuyer}</td>
                                                <td>{order.name}</td>
                                                <td>{order.stock}</td>
                                                <td>{order.price}</td>
                                                <td>{order.date_added.slice(0, 10)}</td>
                                                {/* <td><div style={{ marginLeft: "50px" }}> */}
                                                {/* <Button variant="warning" size="sm" onClick={this.handleShowUpdate} value={orders.id}>Edit</Button> - <Button variant="danger" size="sm" onClick={() => this.handleShowDeleteUser(orders.id)} >Delete</Button> */}
                                                {/* </div></td> */}
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>

                            <ModalDeleteUser show={this.state.showDeleteUser} onHide={this.handleCloseDeleteUser} onClick={this.onSelectProductDeleteUser} id={this.state.id} />

                            {/* //edit */}
                            <ModalEditUser show={this.state.showUpdate} onHide={this.handleCloseUpdate} onClick={this.onSelectProductUpdate} idUser={this.state.idUser} />

                            <Col>
                                {/* tambah disini */}
                                <div>
                                    {/* <Line

                                        width={100}
                                        height={50}
                                        options={{ maintainAspectRatio: false }}
                                    /> */}
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
    console.log(state)
    return {
        categorys: state.categorys.categorys,
        users: state.users.users,
        orders: state.order.order
    }
}

export default connect(searchStateToProps)(TableCategory);