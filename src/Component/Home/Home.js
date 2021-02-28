import React, { Component } from 'react';
import NavbarPage from '../Layout/Navbar'
import NavbarIn from '../Layout/NavbarSlide'
import { connect } from 'react-redux'
import Product from '../Layout/Product'
import { getData } from '../../utils/getUser'
import { Tooltip, Row, Col, Button } from 'antd'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { AiOutlineDashboard, AiOutlineOrderedList } from 'react-icons/ai'
import { Link, Switch, Route, withRouter, NavLink } from 'react-router-dom'
import Dashboard from './Dashboard'
import ProductAdmin from './ProductAdministrator'
import './style.css'
import { GiCherish } from 'react-icons/gi'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            send: '',
            setIsModalVisible: false,
            responsive: false
        }
    }
    // parseJwt = (token) => {
    //     let base64Url = token.split('.')[1];
    //     let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');f
    //     let jsonPayload = base64 ? decodeURIComponent(atob(base64).split('').map(function (c) {
    //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    //     }).join('')) : null;

    //     return JSON.parse(jsonPayload);
    // };
    userName = () => {
        if (!sessionStorage.getItem('ID')) {
            this.props.history.push('/login')
        } else {
            getData('/user?detail=' + sessionStorage.getItem('ID')).then(data => {
                console.log(data, 'inidata')
                this.setState({
                    nameAkun: data.data.result.name,
                    status: data.data.result.Status
                })
            })
        }
    }

    componentDidMount() {
        this.userName()
        console.log(this.props.location.pathname, 'inipathname')
        // this.getProduct()
    }
    showModal = () => {
        this.setState({
            setIsModalVisible: true
        })
        // setIsModalVisible(true);
    };

    handleOk = () => {
        this.setState({
            setIsModalVisible: false
        })
        // setIsModalVisible(false);
    };

    handleCancel = () => {
        this.setState({
            setIsModalVisible: false
        })
        // setIsModalVisible(false);
    };
    buttonPembayaran = () => {
        const { product } = this.props
        console.log(product, 'inihome')
        if (product.cart.cart.length > 0) {
            return (
                <Button type="ghost" ghost={false} style={{ background: '#a0d911', border: 'none', color: '#66AFA9', width: 200, borderRadius: 10 }} onClick={() => this.showModal()} className="pesan-pembayaran">PEMBAYARAN</Button>
            )
        } else {
            return (
                <Button type="ghost" ghost={false} style={{ background: '#a0d911', border: 'none', color: '#66AFA9', width: 200, borderRadius: 10, display: 'none' }} onClick={() => this.showModal()} className="pesan-pembayaran">PEMBAYARAN</Button>
            )
        }
    }

    onLogout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('ID');
        this.props.history.push('/login');
    }

    ChildItem = (e) => {
        this.setState({
            send: e
        })
    }
    returnData = () => {
        const text = <span>Keluar</span>;
        const myName = String(this.state.nameAkun).substring(0, 6).toUpperCase()
        if (this.state.status === 3) {
            return (
                <>
                    <div>
                        <Row>
                            <Col xs={this.state.responsive ? 1 : 4} style={{ height: "100vh", background: '#FFF', transition: '1s ease' }}>
                                <div style={{ height: 70, background: '#66AFA9' }} className="d-flex justify-content-center align-items-center slideLeft">
                                    <Tooltip placement="bottomLeft" title={text}>
                                        <a href onClick={() => this.onLogout()}>
                                            <div style={{ width: "100%", maxWidth: 230, flexWrap: 'wrap' }} className="d-flex align-items-center">
                                                <AiOutlinePoweroff style={{ fontSize: 18 }} className="mr-3" />
                                                <div style={{ color: '#000', fontSize: 25 }} className="text-center">{!this.state.responsive && (
                                                    // @ts-ignore
                                                    `Hi,` + myName.length > 7 ? myName.substring(0, 7) + "..." : myName)} </div>
                                            </div>
                                        </a>
                                    </Tooltip>
                                </div>
                                <div style={{ background: 'rgb(78 131 126)', height: "100vh" }}>
                                    <div className="text-center pt-3" style={{ fontSize: "2vw" }}>{this.state.responsive ? null : "CashSirApp"}</div>
                                    <div className="mt-5">
                                        <div style={{ height: 1, backgroundColor: 'rgb(118 199 192)' }}></div>
                                        <NavLink to={'/dashboard/' + sessionStorage.getItem('ID')}>
                                            <div className={this.props.location.pathname === '/dashboard/' + sessionStorage.getItem('ID') ? "d-flex justify-content-center yes" : "d-flex justify-content-center"} style={{ backgroundColor: 'rgb(78, 131, 126)' }} >
                                                <div className="text-center d-flex  align-items-center" style={{ fontSize: 15, width: 150, height: 40 }}>
                                                    <div className={'ml-3 text-white'}><AiOutlineDashboard /></div>
                                                    <div className="ml-3 text-white" style={this.state.responsive ? { display: 'none', transitionDuration: '5s ease' } : { display: 'block' }}>Dashboard</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <div style={{ height: 1, backgroundColor: 'rgb(118 199 192)' }}></div>
                                        <NavLink to={`/product/${sessionStorage.getItem('ID')}`}>
                                            <div className={this.props.location.pathname === '/product/' + sessionStorage.getItem('ID') ? "d-flex justify-content-center yes" : "d-flex justify-content-center"} style={{ backgroundColor: 'rgb(78, 131, 126)' }} >
                                                <div className="text-center d-flex  align-items-center" style={{ fontSize: 15, width: 150, height: 40 }}>
                                                    <div className={"ml-3 text-white"}><AiOutlineOrderedList /></div>
                                                    <div className="ml-3 text-white" style={this.state.responsive ? { display: 'none', transitionDuration: '5s ease' } : { opacity: 'block' }}>Produk</div>
                                                </div>
                                            </div>
                                        </NavLink>
                                        <div style={{ height: 1, backgroundColor: 'rgb(118 199 192)' }}></div>
                                        <Link to="" className="d-flex justify-content-center" >
                                            <div className="text-center d-flex  align-items-center" style={{ fontSize: 15, width: 150, height: 40 }}>
                                                <div className={"ml-3 text-white"}>Logo</div>
                                                <div className="ml-3 text-white" style={this.state.responsive ? { display: 'none', transitionDuration: '5s ease' } : { display: 'block' }}>Akun</div>
                                            </div>
                                        </Link>
                                        <div style={{ height: 1, backgroundColor: 'rgb(118 199 192)' }}></div>
                                        <Link to={this.props.location.pathname + "/ko"} className="d-flex justify-content-center" >
                                            <div className="text-center d-flex  align-items-center" style={{ fontSize: 15, width: 150, height: 40 }}>
                                                <div className={"ml-3 text-white"}>Logo</div>
                                                <div className="ml-3 text-white" style={this.state.responsive ? { display: 'none', transitionDuration: '5s ease' } : { display: 'block' }}>Favorite</div>
                                            </div>
                                        </Link>
                                        <div style={{ height: 1, backgroundColor: 'rgb(118 199 192)' }}></div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={this.state.responsive ? 23 : 20} style={{ transition: '1s ease' }}>
                                <div style={{ backgroundColor: '#66AFA9', border: "none", height: 70 }} className="d-flex align-items-center">
                                    <Button onClick={() => this.setState({ responsive: !this.state.responsive })} style={{ backgroundColor: 'rgb(78, 131, 126)', color: '#FFF', outline: 'none', border: 'none', boxShadow: '5px 5px 25px -6px rgba(0,0,0,0.76)' }} className="btn-active"><GiCherish /></Button>
                                </div>
                                <div className="p-5" style={{ maxHeight: '100vh' }}>
                                    {/* <HashRouter> */}
                                    <Switch>
                                        {/* <Route path="/">
                                            <div>Pilih Menu</div>
                                        </Route> */}
                                        <Route path={"/dashboard/:id"}>
                                            <Dashboard />
                                        </Route>
                                        <Route path={"/product/:id"}><ProductAdmin /></Route>
                                    </Switch>
                                    {/* </HashRouter> */}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </>
            )
        } else if (this.state.status === 2 || this.state.status === 1) {
            return (
                <>
                    <div>
                        <Row>
                            <Col xs={5} style={{ height: "100vh", background: '#70A9A4' }}>
                                <div style={{ height: 70, background: '#66AFA9' }} className="d-flex justify-content-center align-items-center slideLeft">
                                    <Tooltip placement="bottomLeft" title={text}>
                                        <a
                                            // @ts-ignore
                                            href onClick={() => this.onLogout()}>
                                            <div style={{ width: "100%", maxWidth: 230, flexWrap: 'wrap' }} className="d-flex align-items-center">
                                                <AiOutlinePoweroff style={{ fontSize: 18 }} className="mr-3" />
                                                <div style={{ color: '#000', fontSize: 25 }} className="text-center">Hi, {myName.length > 7 ? myName.substring(0, 7) + "..." : myName} </div>
                                            </div>
                                        </a>
                                    </Tooltip>
                                </div>
                                <NavbarIn ChildItem={this.ChildItem} />
                                <div className="d-flex justify-content-center align-items-center" style={{ background: '#70A9A4', width: '100%', height: '11.8%', position: 'fixed', bottom: 0 }}>
                                    <div className="d-flex" style={{ width: 500 }}>
                                        {/* {this.buttonPembayaran()} */}
                                    </div>
                                </div>
                            </Col>
                            <Col xs={19}>
                                <NavbarPage />
                                <div className="p-3" style={{ width: "100%", height: '77%', maxHeight: '77%' }}>
                                    <Product
                                        // @ts-ignore
                                        send={this.state.send} setIsModalVisible={this.state.setIsModalVisible} handleCancel={this.handleCancel} />
                                </div>
                                <div className="d-flex justify-content-center align-items-center" style={{ background: '#70A9A4', width: '100%', height: '11.8%' }}>
                                    <div className="d-flex" style={{ width: 500 }}>
                                        {this.buttonPembayaran()}
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </>
            )
        }
    }

    render() {
        return (
            <>
                {this.returnData()}
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    product: state
})
// const ShowTheLocationWithRouter = withRouter(ShowTheLocation);

export default withRouter(connect(mapStateToProps)(Home));