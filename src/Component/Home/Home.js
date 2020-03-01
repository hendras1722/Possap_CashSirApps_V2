import React, { Component } from 'react';
import NavbarPage from '../Layout/Navbar'
import Part1 from '../Layout/Part1'
import Part2 from '../Layout/Part2'

class Home extends Component {

    render() {
        console.log('render');
        return (
            <div>
                <NavbarPage />
                <Part1 />
                <Part2 />
            </div>
        )
    }
}

export default Home;