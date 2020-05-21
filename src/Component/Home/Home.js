import React, { Component } from 'react';
import NavbarPage from '../Layout/Navbar'
import SectionTop from '../Layout/SectionTop'
import Product from '../Layout/Product'


class Home extends Component {
    async componentDidMount() {
        if (localStorage.getItem('token') === "undefined") {
            localStorage.setItem('user-id', "");
            localStorage.setItem('token', "");
            localStorage.setItem('isAuth', false);
            localStorage.setItem('Status', "");
            this.props.history.push('/login');
            return (
                <div show={alert('wewoew')} style={{ background: 'red' }}>
                    <p>Email/Password Salah</p>
                </div>
            )
        }
        if (!localStorage.getItem('isAuth')) {
            this.props.history.push('/login');
        }
    }

    onLogout() {
        localStorage.removeItem('user-id');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('Status');
        this.props.history.push('/login');
    }

    render() {
        return (
            <>
                <div>
                    <NavbarPage logout={this.onLogout.bind(this)} />
                    <SectionTop />
                    <Product />
                </div>
            </>
        )
    }
}

export default Home;