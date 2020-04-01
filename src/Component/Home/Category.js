import React, { Component } from 'react'
import NavbarTable from '../Layout/NavbarTable'
import TableCategory from '../Layout/TableCategory'

class Category extends Component {
    state = {
        show: false
    }


    render() {
        return (
            <div>
                <NavbarTable />
                <TableCategory />
            </div>
        )
    }
}


export default Category;