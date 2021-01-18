import React, { Component } from 'react';
import NavbarPage from '../Layout/Navbar'
import NavbarIn from '../Layout/NavbarSlide'
import { connect } from 'react-redux'
import Product from '../Layout/Product'
import { getData, getUser } from '../../utils/getUser'
import { Row, Col, Button } from 'antd'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            send: '',
            setIsModalVisible: false
        }
    }
    parseJwt = (token) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = base64 ? decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')) : null;

        return JSON.parse(jsonPayload);
    };
    userName = async () => {
        const tokenId = localStorage.getItem("token") ? this.parseJwt(localStorage.getItem("token")).id : 'tidak valid'
        if (tokenId === 'tidak valid') {
            this.props.history.push('/login')
        } else {
            const { data } = await getData('/user?detail=' + tokenId)
            this.setState({
                nameAkun: data.result.name
            })
        }
    }
    async componentDidMount() {
        console.log(localStorage.length)
        if (localStorage.getItem("token") === undefined || localStorage.length === 0 || !localStorage.getItem("token")) {
            this.props.history.push('/login')
        } else {
            this.props.history.push('/user/' + this.parseJwt(localStorage.getItem("token")).id)
        }
        this.userName()
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
    componentDidUpdate() {
    }

    onLogout() {
        localStorage.removeItem('user-id');
        localStorage.removeItem('token');
        this.props.history.push('/login');
    }

    ChildItem = (e) => {
        this.setState({
            send: e
        })
    }

    render() {
        return (
            <>
                <div>
                    <Row>
                        <Col xs={5} style={{ height: "100vh" }}>
                            <div style={{ height: 70, background: '#66AFA9' }} className="d-flex justify-content-center align-items-center slideLeft">
                                <div style={{ width: "100%", maxWidth: 220, flexWrap: 'wrap' }}>
                                    <div style={{ color: '#000', fontSize: 28 }} className="text-center">Hi, {String(this.state.nameAkun).toUpperCase()} </div>
                                </div>
                            </div>
                            <NavbarIn ChildItem={this.ChildItem} />
                        </Col>
                        <Col xs={19}>
                            <NavbarPage logout={this.onLogout.bind(this)} />
                            <div className="p-3" style={{ width: "100%", height: '77%', maxHeight: '77%' }}>
                                <Product send={this.state.send} setIsModalVisible={this.state.setIsModalVisible} handleCancel={this.handleCancel} />
                            </div>
                            <div className="d-flex justify-content-center align-items-center" style={{ background: '#66AFA9', width: '100%', height: '11.8%', position: 'fixed' }}>
                                <div className="d-flex" style={{ width: 500 }}>
                                    {this.buttonPembayaran()}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {/* <SectionTop /> */}
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => ({
    product: state
})

export default connect(mapStateToProps)(Home);