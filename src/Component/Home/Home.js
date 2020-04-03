import React, { Component } from 'react';
import NavbarPage from '../Layout/Navbar'
import SectionTop from '../Layout/SectionTop'
import Product from '../Layout/Product'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Home extends Component {
    // componentDidMount() {

    // }
    async componentDidMount() {
        if (!localStorage.getItem('isAuth')) {
            this.props.history.push('/login');
        }
    }

    onLogout() {
        console.log('logout')
        localStorage.removeItem('user-id');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('Status');
        this.props.history.push('/login');
    }

    render() {
        console.log('render');
        return (

            < div >
                <NavbarPage logout={this.onLogout.bind(this)} />
                <SectionTop />
                <Product />
            </div >
        )
    }
}

export default Home;