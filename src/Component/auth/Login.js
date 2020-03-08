import React, { Component } from 'react';
import axios from 'axios';
import background from '../img/backgroundllogin.jpg'
import { FormCheck, Form } from 'react-bootstrap'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    componentDidMount() {
        if (localStorage.getItem('token')) {
            this.props.history.push('/');
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('hahaa');

        axios
            .post("http://localhost:4000/user/login", this.state)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user-id', res.data.id);
                localStorage.setItem('isAuth', true);
                localStorage.setItem('Status', res.data.Status)
                this.props.history.push('/');
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        return (
            <div>
                <img src={background} style={{ position: "absolute", width: "100%", height: "100vh", marginTop: "0px" }} />

                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-md-8">
                            <form onSubmit={this.onSubmit} style={{ marginLeft: "400px", marginTop: "180px" }}>
                                <div className="form-group">
                                    {/* <label>Email</label> */}
                                    <input type="text" className="form-control" placeholder="Enter email" name="email" onChange={this.onChange} style={{ width: "500px" }} required />
                                </div>
                                <div className="form-group">
                                    {/* <label>Password</label> */}
                                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.onChange} style={{ width: "500px" }} required />
                                </div>
                                <Form.Group>
                                    <Form.Check
                                        required
                                        label="Agree to terms and conditions"
                                        feedback="You must agree before submitting."
                                    />
                                </Form.Group>
                                <button type="submit" className="btn btn-primary" style={{ width: "500px" }}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;