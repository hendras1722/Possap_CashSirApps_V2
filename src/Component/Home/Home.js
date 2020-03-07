import React, { Component } from 'react';
import NavbarPage from '../Layout/Navbar'
import SectionTop from '../Layout/SectionTop'
import Product from '../Layout/Product'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


class Home extends Component {
    componentDidMount() {
        if (!localStorage.getItem('isAuth')) {
            this.props.history.push('/login');
        }
    }
    onLogout() {
        localStorage.removeItem('user-id');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        this.props.history.push('/login');
    }

    render() {
        console.log('render');
        return (
            <Router>
                <Switch>
                    <div>
                        <NavbarPage onClick={this.onLogout.bind(this)} />
                        <SectionTop />
                        <Product />
                    </div>
                </Switch>
            </Router>
        )
    }
}

export default Home;