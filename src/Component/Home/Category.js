import React, { Component, Fragment } from 'react'
import Home from '../Home/Home'
import Navbar from '../Layout/NavbarTable'
import Settings from '../Layout/TableCategory'

class Category extends Component {
    state = {
        show: false
    }

    render() {
        const ValidasiStatus = () => {
            if (localStorage.getItem('Status') === '2') {
                return (
                    <>
                        <Home />
                    </>
                )
            } else {
                return (
                    <Fragment>
                        <Navbar />
                        <Settings />
                    </Fragment>
                )
            }
        }
        return (
            <ValidasiStatus />
        )
    }
}


export default Category;