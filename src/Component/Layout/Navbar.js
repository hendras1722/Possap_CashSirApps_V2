import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Row, Col } from 'antd'
import { getUser } from '../../utils/getUser'

const NavbarPage = (props) => {
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(getUser(), 'iniget')
    })
    return (
        <div style={{ backgroundColor: '#66AFA9', border: "none", height: 70 }}>

        </div>
    )
}

// class NavbarPage extends Component {
//     state = {
//         count: parseInt(this.props.cart.length) || 0
//     }

//     onSubmit = async (id) => {
//         const data = {
//             idBuyer: parseInt(localStorage.getItem('id')),
//             products: this.props.cart
//         }
//         // await this.props.dispatch(deleteCart())
//         // console.log("saldas;d", data)
//         await this.props.dispatch(orderCheckout(data))
//         await this.props.dispatch(deleteCart(id))
//     }

//     onLogout = async () => {
//         localStorage.removeItem('user-id');
//         localStorage.removeItem('token');
//         localStorage.removeItem('isAuth');
//         localStorage.removeItem('Status');
//         if (localStorage.getItem('token') === undefined) {
//             await this.props.history.push('/login');
//         }
//     }

//     componentDidUpdate() {
//         console.log(cobaman(), 'inihome')
//     }
//     render() {
//         // console.log(this.props.cart.length === 1, "dsakdasld")

//         const ValidasiFrom = () => {
//             if (localStorage.getItem('Status') === '1') {
//                 return (
//                     <Fragment>
//                         <Navbar.Brand className="text-white text-center">Admin</Navbar.Brand>
//                         <Link to="/settings"><button style={{ backgroundColor: "#3346A8", border: "none" }}>
//                             <img src={logocat} style={{ width: "30px", height: "30px" }} alt="admin" /></button>
//                         </Link>
//                     </Fragment>
//                 )
//             }
//             else if (localStorage.getItem('Status') === '2') {
//                 return (
//                     <Fragment>
//                         <Navbar.Brand className="text-white text-center">Cashier</Navbar.Brand>
//                     </Fragment>
//                 )
//             }
//             else {
//                 return (
//                     <Fragment></Fragment>
//                 )
//             }
//         }

//         const { cart, total } = this.props
//         console.log(this.props)
//         return (
//             <div>
//                 <button onClick></button>
//             </div>
//         )
//     }
// }
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        products: state.products.products,
        categorys: state.categorys.categorys,
        pagination: state.products.pagination,
        cart: state.cart.cart,
        total: state.cart.total
    }
}

const mapDispatchToProps = (state) => {

}

export default connect(mapStateToProps)(NavbarPage);