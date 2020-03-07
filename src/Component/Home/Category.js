import React, { Component } from 'react'
import NavbarTable from '../Layout/NavbarTable'
import TableCategory from '../Layout/TableCategory'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class Category extends Component {
    state = {
        show: false
    }


    render() {
        return (
            <Router>
                <div>
                    <NavbarTable />
                    <TableCategory />
                </div>
            </Router>
        )
    }
}


export default Category;