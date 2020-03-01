import React, { Component } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

import { connect } from 'react-redux';
import { getBooks } from '../redux/actions/book';

class Book extends Component {

    getBooks() {
        this.props.dispatch(getBooks());
    }

    componentDidMount() {
        console.log(this.props);
        this.getBooks();
    }

    render() {
        const { books } = this.props;
        return (
            <Container> <div className="container"></div>
                <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Col sm={10}>
                        <h4>Books</h4>
                    </Col>
                    <Col sm={2}>
                        <Button variant="primary" size="sm" >Add Book</Button>
                    </Col>
                </Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Writer</th>
                            <th>Description</th>
                            <th>Publisher</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) =>
                            <tr key={index}>
                                <td>{book.id}</td>
                                <td>{book.name}</td>
                                <td>{book.writer}</td>
                                <td>{book.description}</td>
                                <td>{book.publisher}</td>
                                <td>{book.stock}</td>
                                <td><Button variant="warning">Edit</Button> - <Button variant="danger">Delete</Button></td>
                            </tr>
                        )}

                    </tbody>
                </Table>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {

        books: state.books.books
    }
}

export default connect(mapStateToProps)(Book);