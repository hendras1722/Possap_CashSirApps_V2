import React, { Component } from 'react';
import NavbarAdm from '../Layout/NavbarAdm'
import SectionTop from '../Layout/SectionTop'
import ProductAdm from '../Layout/ProductAdministrator'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavbarPage from '../Layout/Navbar'

class Home extends Component {

    render() {
        console.log('render');
        return (

            <div>
                <NavbarPage />
                {/* <NavbarAdm /> */}
                <SectionTop />
                <ProductAdm />
            </div>
        )
    }
}

export default Home;