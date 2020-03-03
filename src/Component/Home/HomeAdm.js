import React, { Component } from 'react';
import NavbarPage from '../Layout/Navbar'
import SectionTop from '../Layout/SectionTop'
import ProductAdm from '../Layout/ProductAdministrator'

class Home extends Component {

    render() {
        console.log('render');
        return (
            <div>
                <NavbarPage />
                <SectionTop />
                <ProductAdm />
            </div>
        )
    }
}

export default Home;