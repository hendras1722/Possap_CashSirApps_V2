import React, { Component } from 'react';
import axios from 'axios';
import background from '../img/user.png'
import './login.css'
import { notification } from 'antd'
import { idDetail } from '../../utils/getUser'

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            Loading: false
        };
    }

    componentDidMount() {
        if (!sessionStorage) {
            this.props.history('/login')
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            Loading: true
        })
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        const { REACT_APP_API_URL } = process.env
        axios
            .post(`${REACT_APP_API_URL}/user/login`, data)
            .then(res => {
                console.log(res, 'inires')
                if (res.data.status === 400) {
                    notification['error']({
                        message: res.data.message
                    });
                    this.props.history.push('/login')
                } else {
                    sessionStorage.setItem('token', res.data.token);
                    this.props.history.push('/user/' + res.data.id);
                    idDetail(res.data.id)
                    this.setState({
                        Loading: false
                    })
                }
            })
            .catch(err => {
                // console.log(err.message, 'inierror')
                notification['error']({
                    message: err.message
                });
                this.props.history.push('/login')
                this.setState({
                    Loading: false
                })
            }).finally(e => {
                console.log(e, 'inie')
                this.setState({
                    Loading: false
                })
            })
    }

    render() {
        return (
            <div className="container-fluid" >
                <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                    <div style={{ backgroundColor: 'white', padding: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', border: '1px double black', height: 'auto', width: '100%', maxWidth: 400, boxShadow: '1px 1px 5px 1px rgba(0, 0, 0, 0.75)' }}>
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
                            <div className="d-flex justify-content-center">
                                <form onSubmit={this.onSubmit} >
                                    <div className="form-group">
                                        {/* <label>Email</label> */}
                                        <input type="email" className="form-control" placeholder="Enter email" name="email" onChange={this.onChange} style={{ width: "300px" }} required />
                                    </div>
                                    <div className="form-group">
                                        {/* <label>Password</label> */}
                                        <input type="password" className="form-control" id="password-field" placeholder="Enter password" name="password" onChange={this.onChange} style={{ width: "300px" }} required />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-active" style={{ width: "300px" }}>{this.state.Loading ? <div><div className="spinner-border text-white" style={{ width: 20, height: 20 }}></div></div> : "Login"}</button>
                                </form>
                            </div>
                            <div style={{ marginTop: 30, marginBottom: -50, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <p>Versi 2.00</p>
                            </div>
                            <div style={{ marginTop: 30, marginBottom: -50, justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                                <p style={{ fontSize: 12, marginTop: 5 }}>Cash Sir</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;