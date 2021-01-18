import React, { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteCart } from '../redux/actions/carts'
import { postData } from '../../utils/getUser'
import { addCart } from '../redux/actions/carts'
import { Button } from 'antd'
import { connect } from 'react-redux'
import './style.css'

const Modal = (props) => {
    const [dataSend, setDataSend] = useState('')
    const dispatch = useDispatch()
    const parseJwt = (token) => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };
    console.log(props, 'iniprops.modal')
    const JWT = parseJwt(localStorage.getItem("token")).id
    const { product } = props
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
        console.log('ikiCLick')
        // postData('/order', data).then(res => {
        //     dispatch(addCart("Selesai"))
        // }).catch(e => {
        //     console.error('ini Error')
        // })
        // if (product.order.notif === "berhasil") {
        //     dispatch(addCart('Selesai'))
        //     props.handleCancel()
        // } else {
        //     return data
        // }
        // props.handleCancel()
    }
    console.log(order(), 'iniorder')
    return (
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
                            <Button id="printPageButton" onClick={() => dispatch(deleteCart(item.id))}>Hapus</Button>
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
                <div className="mt-3">
                    <Button onClick={() => order()}>Selesai</Button>
                </div>

                {/* <button id="printPageButton" onClick={() => window.print()}>Print</button> */}
            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps)(React.memo(Modal));