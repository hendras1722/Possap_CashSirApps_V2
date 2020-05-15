import React, { Component } from 'react'
import NavbarTable from '../Layout/NavbarTable'
import TableCategory from '../Layout/TableCategory'
import NavbarPage from '../Layout/Navbar'
import SectionTop from '../Layout/SectionTop'
import Product from '../Layout/Product'

class Category extends Component {
    state = {
        show: false
    }
    onLogout() {
        localStorage.removeItem('user-id');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('Status');
        this.props.history.push('/login');
    }
    render() {
        const ValidasiStatus = () => {
            if (localStorage.getItem('Status') === '2') {
                return (
                    <>
                        <NavbarPage logout={this.onLogout.bind(this)} />
                        <SectionTop />
                        <Product />
                    </>
                )
            } else {
                return (
                    <div>
                        <NavbarTable />
                        <TableCategory />
                    </div>
                )
            }
        }
        return (
            <ValidasiStatus />
        )
    }
}


export default Category;