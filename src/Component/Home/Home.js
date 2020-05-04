import React, { Component } from 'react';
import NavbarPage from '../Layout/Navbar'
import SectionTop from '../Layout/SectionTop'
import Product from '../Layout/Product'


class Home extends Component {
    async componentDidMount() {
        if (!localStorage.getItem('token')) {
            this.props.history.push('/login');
        } else if (localStorage.getItem('token') === "undefined") {
            this.onLogout();
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
        console.log('render');
        return (
            <>
                <NavbarPage logout={this.onLogout.bind(this)} />
                <SectionTop />
                <Product />
            </>
        )
    }
}

export default Home;