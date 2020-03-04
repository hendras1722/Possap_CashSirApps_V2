import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Col, Row, Button, Form, FormControl, Tab, Tabs } from 'react-bootstrap'
import { getCategory } from '../redux/actions/Category'
import { connect } from 'react-redux';
import { searchCategory } from '../redux/actions/Category'
import { postCategory } from '../redux/actions/Category'
import { getUser } from '../redux/actions/user'
import ModalDeleteCategory from '../Layout/ModalDeleteCategory'
import ModalEditCategory from '../Layout/ModalEditCategory'

class TableCategory extends Component {
    state = {
        name: '',
        id: ''
    }

    onChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        let data = {
            name: this.state.name
        }

        console.log(this.state)
        this.props.dispatch(postCategory(data));
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

    // modal edit
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
    onSelectProductDelete = (category) => {
        this.setState({
            selectProductDelete: category,
            showDelete: true
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


    // delete
    onSelectProductEdit = (e) => {
        // console.log("kelqwk")
        // console.log(e.target.value)
        this.setState({
            // selectProductEdit: product,
            showEdit: true
        })
    }
    //edit

    componentDidMount() {
        this.getCategory();
        this.getUser();
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
                                            <tr>
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
                                                <td><div style={{ marginLeft: "50px" }}><Button variant="warning" size="sm">Edit</Button> - <Button variant="danger" size="sm" >Delete</Button></div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Col>

                            <ModalDeleteCategory show={this.state.showDelete} onHide={this.handleCloseDelete} onClick={this.onSelectProductDelete} id={this.state.id} />

                            {/* //edit */}
                            <ModalEditCategory show={this.state.showEdit} onHide={this.handleCloseEdit} onClick={this.onSelectProductEdit} idCategory={this.state.idCategory} />

                            <Col>
                                <h3 style={{ marginLeft: "150px", marginTop: "10px" }}>ADD USER</h3>
                                <br />
                                <form onSubmit={this.onSubmit}>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="name" id="exampleInputName1" placeholder="Enter Category" onChange={this.onChange} style={{ width: "400px" }} required />
                                    </div>
                                    <button type="submit" class="btn btn-primary" style={{ width: "400px" }}>Submit</button>
                                </form>
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