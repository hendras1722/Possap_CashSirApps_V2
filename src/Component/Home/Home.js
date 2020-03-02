import React, { Component } from 'react';
import NavbarPage from '../Layout/Navbar'
import SectionTop from '../Layout/SectionTop'
import Product from '../Layout/Product'

class Home extends Component {

    render() {
        console.log('render');
        return (
            <div>
                <NavbarPage />
                <SectionTop />
                <Product />
            </div>
        )
    }
}

export default Home;