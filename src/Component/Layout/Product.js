// @ts-nocheck
import React, { useEffect, useState, Fragment } from 'react'
import { getProducts } from '../redux/actions/Product'
import { addCart, deleteCart } from '../redux/actions/carts'
import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { postData, getData } from '../../utils/getUser'
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from 'react-icons/fa'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
// import ModalPembayaran from './Modal'
// import imageWelcome from '../../assets/10808.jpg'
import { Image, Row, Col, Button, Input, Modal, notification } from 'antd'
import './style.css'

const { TextArea } = Input
const Product = (props) => {
    const [catatan, setCatatan] = useState('')
    const [qty, setCount] = useState(0);
    const [nameUserNya, setNameUser] = useState()
    const [idUsernya, setIdUsernya] = useState()
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!sessionStorage) {
            history.push('/login')
        }
        NameUser()
    }, [])
    console.log(props, 'inpros')
    const { send, product, setIsModalVisible, handleCancel } = props
    const catatanData = {
        catatan
    }
    const NameUser = async () => {
        const pathname = history.location.pathname
        const split = pathname.split('/')
        const result = split[split.length - 1]
        console.log(result)
        setIdUsernya(result)
        const { data } = await getData(`/user?detail=${result}`)
        setNameUser(data.result)
    }
    const addPlus = () => {
        if (nameUserNya?.Status === 1) {
            if (send) {
                const arrayPlus = send?.map((item) => item.price)
                const reducer = (accumulator, currentValue) => accumulator + currentValue;
                // console.log(arrayPlus.reduce(reducer))
                return arrayPlus.reduce(reducer)
            }
        }
    }
    const productIsi = () => {
        if (nameUserNya?.Status === 1) {
            return (
                <div>
                    <Row>
                        <Col xs={24}>
                            <div className="d-flex justify-content-center">
                                <div style={{ width: 300 }}>
                                    <div style={{ display: send ? 'block' : 'none' }}>
                                        <div className="text-center">
                                            list Menu
                           </div>
                                        <div className="mt-3">
                                            {send && send.map((item, index) =>
                                                <>
                                                    <div key={index} className="d-flex justify-content-center">
                                                        <div style={{ width: 300 }} className=" d-flex justify-content-between">
                                                            <div>{item.name}</div>
                                                            <div>Rp.{item.price?.toLocaleString('id-ID')} ({item.stock})</div>
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-start">
                                                        <div>Catatan :</div>&nbsp;<q style={{ fontWeight: 600 }} className="ml-1">{item.catatan}
                                                        </q>
                                                    </div>
                                                </>
                                            )}
                                            <div className="d-flex justify-content-center">
                                                <div style={{ width: 300 }} >----------------------------------------------------------</div>
                                            </div>
                                            <div className=" d-flex justify-content-center">
                                                <div style={{ width: 300 }} className="d-flex justify-content-between pr-4">
                                                    <div>Total harga</div>
                                                    <div>Rp.{addPlus()?.toLocaleString('id-ID')}</div>
                                                </div>
                                            </div>
                                            <button onClick={() => window.print()}>print</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Modal title={false} visible={setIsModalVisible} footer={null} closable={false} onCancel={() => handleCancel()} style={{ borderRadius: "10px" }}>
                        <Fragment>
                            <div className="page">
                                <div className="text-center">List Pesan</div>
                                {product.cart.cart.map((item, index) =>
                                    <div className="d-flex mt-3 row align-items-center" key={index}>
                                        <div className="col-10 d-flex justify-content-between">
                                            <div> {item.name} </div>
                                            <div>
                                                Rp.{Number(item.price).toLocaleString('id-ID')}*{item.qty}
                                            </div>
                                        </div>
                                        <div className="col-2 justify-content-end">
                                            <Button style={{ background: '#66AFA9', border: 'none', borderRadius: 5, color: '#FFF' }} id="printPageButton" className="btn-active" onClick={() => dispatch(deleteCart(item.id))}>Hapus</Button>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-3">-------------------------------------------------------------------------------------------</div>
                                <div className="d-flex justify-content-between" style={{ paddingRight: 90 }}>
                                    <div>
                                        Jumlah:
                    </div>
                                    <div>
                                        Rp.{Number(product.cart.total).toLocaleString("id-ID")}
                                    </div>
                                </div>
                                <div className="mt-3 d-flex justify-content-center" >
                                    <Button style={{ background: '#66AFA9', border: 'none', borderRadius: 5, color: '#FFF', display: product.cart.total === 0 ? 'none' : 'block' }} onClick={() => order()}>Selesai Memesan</Button>
                                </div>

                                {/* <button id="printPageButton" onClick={() => window.print()}>Print</button> */}
                            </div>
                        </Fragment>
                    </Modal>
                    {/* <img src={imageWelcome} style={{ width: "100%", maxWidth: 550, height: "100%", maxHeight: 200 }} /> */}
                </div>
            )
        } else {
            return (
                <div>
                    <Row>
                        <Col xs={24}>
                            <div className="mt-3 d-flex align-items-start">
                                <div style={{ display: send.image ? 'block' : 'none' }}>
                                    <Image
                                        width={300}
                                        height={200}
                                        style={{ borderRadius: 10 }}
                                        src={send.image}
                                    />
                                </div>
                                <div className="ml-3" >
                                    <div style={{ fontSize: 35, fontWeight: 'bold' }}>
                                        {send.name}
                                    </div>
                                    <div className="d-flex" >

                                    </div>
                                    <div style={{ display: send.image ? 'block' : 'none', width: '100%', maxWidth: 300 }}>
                                        <div className="d-flex">
                                            <div>
                                                <a onClick={() => setCount(qty + 1)} className="Cart" style={{ display: send.image ? 'block' : 'none' }}>
                                                    <FaArrowAltCircleUp style={{ fontSize: 25 }} />
                                                </a>
                                                <div className=" d-flex justify-content-center mt-1" style={{ fontSize: 25, width: '100%' }}>
                                                    <div style={{ display: send.image ? 'block' : 'none' }}>
                                                        {countStock() < 0 ? 0 : countStock()}</div>
                                                </div>
                                                <a onClick={() => setCount(qty - 1)} className="Cart" style={{ display: send.image ? 'block' : 'none' }}>
                                                    <FaArrowAltCircleDown style={{ fontSize: 25 }} />
                                                </a>
                                            </div>
                                            <TextArea className="ml-3" rows={3} value={catatan} placeholder="Tambahkan catatan disini" style={{ borderRadius: 5 }} onChange={(e) => setCatatan(e.target.value)} />
                                        </div>
                                        <div className="d-flex justify-content-center mt-3">
                                            {pesanItem()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-start">
                                {description(send.description)}
                            </div>
                        </Col>
                    </Row>
                    <Modal title={false} visible={setIsModalVisible} footer={null} closable={false} onCancel={() => handleCancel()} style={{ borderRadius: "10px" }}>
                        <Fragment>
                            <div className="page">
                                <div className="text-center">List Pesan</div>
                                {product.cart.cart.map((item, index) =>
                                    <div className="d-flex mt-3 row align-items-center" key={index}>
                                        <div className="col-10 d-flex justify-content-between">
                                            <div> {item.name} </div>
                                            <div>
                                                Rp.{Number(item.price).toLocaleString('id-ID')}*{item.qty}
                                            </div>
                                        </div>
                                        <div className="col-2 justify-content-end">
                                            <Button style={{ background: '#66AFA9', border: 'none', borderRadius: 5, color: '#FFF' }} id="printPageButton" className="btn-active" onClick={() => dispatch(deleteCart(item.id))}>Hapus</Button>
                                        </div>
                                    </div>
                                )}
                                <div className="mt-3">-------------------------------------------------------------------------------------------</div>
                                <div className="d-flex justify-content-between" style={{ paddingRight: 90 }}>
                                    <div>
                                        Jumlah:
                </div>
                                    <div>
                                        Rp.{Number(product.cart.total).toLocaleString("id-ID")}
                                    </div>
                                </div>
                                <div className="mt-3 d-flex justify-content-center" >
                                    <Button style={{ background: '#66AFA9', border: 'none', borderRadius: 5, color: '#FFF', display: product.cart.total === 0 ? 'none' : 'block' }} onClick={() => order()}>Selesai Memesan</Button>
                                </div>

                                {/* <button id="printPageButton" onClick={() => window.print()}>Print</button> */}
                            </div>
                        </Fragment>
                    </Modal>
                    {/* <img src={imageWelcome} style={{ width: "100%", maxWidth: 550, height: "100%", maxHeight: 200 }} /> */}
                </div>
            )
        }
    }
    let dataSendCart = { ...send, ...catatanData, qty }
    const ButtonSend = (e) => {
        dispatch(addCart(dataSendCart))

        // arrayKosong.push(...dataSendCart, ...arrayKosong)
        // console.log(arrayKosong, 'inikosong')
        setCatatan('')
        setCount(0)
    }
    // console.log(qty, dataSendCart, 'iniqty')
    const countStock = () => {
        return qty
    }
    const pesanItem = () => {
        let existedCartData = product.cart.cart.find(product => product.id === send.id)
        let notif = () => {
            notification['warning']({
                message: 'Tidak Bisa Memesan Menu Yang Sama',
                description:
                    'Silahkan ke pembayaran dan hapus menu ini untuk menambahkan atau menambah catatan',
            });
        }
        if (existedCartData) {
            if (existedCartData.name === send.name) {
                return (
                    <>
                        <Button type="ghost" ghost={false} style={{ color: '#000', width: 299, borderRadius: 10, fontWeight: 600 }} className="pesan-btn" onClick={() => notif()} disabled={qty == 0 ? true : false}>PESAN</Button>
                    </>
                )
            } else {
                return (
                    <>
                        <Button type="ghost" ghost={false} style={{ border: 'none', color: '#000', width: 299, borderRadius: 10, fontWeight: 'bold' }} className="pesan-btn" onClick={() => ButtonSend()} disabled={qty == 0 ? true : false}>PESAN</Button>
                    </>
                )
            }
        } else {
            return (
                <>
                    <Button type="ghost" ghost={false} style={{ border: 'none', color: '#000', width: 299, borderRadius: 10, fontWeight: 'bold' }} className="pesan-btn" onClick={() => ButtonSend()} disabled={qty == 0 ? true : false}>PESAN</Button>
                </>
            )
        }
    }
    const parseJwt = (token) => {
        let base64Url = token?.split('.')[1];
        let base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = base64 ? decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')) : null;

        return JSON.parse(jsonPayload);
    };
    const JWT = sessionStorage.getItem("token") != undefined ? parseJwt(sessionStorage.getItem("token")).id : ""
    const order = () => {
        const products = product.cart.cart.map(item => {
            return {
                "idUser": JWT,
                "id": item.id,
                "qty": item.qty,
                "catatan": item.catatan
            }
        })
        const data = { products }
        postData('/order', data).then(res => {
            dispatch(addCart("Selesai"))
            handleCancel()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Pesanan Sudah Terkirim di kasir',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(e => {
            console.error('ini Error')
        })
    }
    const description = (e) => {
        const paragraph = e?.split("//")
        return (
            <div className="mt-3">
                {paragraph && paragraph.map((item, index) =>
                    <div key={index} style={{ fontSize: 18 }}>{item}</div>
                )}
            </div>
        )
    }
    return (
        <div className=" pt-3 pb-5 pl-3 pr-3" style={{ height: 'auto', borderRadius: 12, background: 'rgb(136 208 200 / 78%)' }}>
            {productIsi()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    product: state
})


export default connect(mapStateToProps, { getProducts })(React.memo(Product));