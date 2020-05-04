import React, { Component } from 'react';
import axios from 'axios';
import background from '../img/user.png'
import './login.css'

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

        axios
            .post("http://18.232.100.68/user/login", this.state)
            .then(res => {
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
            <div >
                <div >
                    <div >
                        <div className="row justify-content-center" style={{ marginTop: 80 }}>
                            <div style={{ backgroundColor: 'white', padding: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', border: '1px double black', boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.75)' }}>
                                <div style={{ justifyContent: 'center ', alignContent: 'center', flex: 0, display: 'flex ', padding: 10, marginTop: -20 }}>
                                    <div style={{
                                        backgroundColor: '#a6a6b7', padding: 20, borderRadius
                                            : 100, marginBottom: 20
                                    }}>
                                        <img alt="profile" src={background} style={{ width: 80, height: 80 }} />
                                    </div>
                                </div>
                                <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                    <h4>Selamat Datang di Cash Sir</h4>
                                </div>
                                <div style={{ top: 50 }}>
                                    <form onSubmit={this.onSubmit} >
                                        <div className="form-group">
                                            {/* <label>Email</label> */}
                                            <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.onChange} style={{ width: "300px" }} required />
                                        </div>
                                        <div className="form-group">
                                            {/* <label>Password</label> */}
                                            <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.onChange} style={{ width: "300px" }} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary" style={{ width: "300px" }}>Login</button>
                                    </form>
                                    <div style={{ marginTop: 30, marginBottom: -50, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <p>Versi 1.01</p>
                                    </div>
                                    <div style={{ marginTop: 30, marginBottom: -50, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                        <p style={{ fontSize: 12, marginTop: 5 }}>Cash Sir</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;