// @ts-nocheck
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory, withRouter } from 'react-router-dom'
import { getData, formatDate } from '../../utils/getUser'
import { Input, Button, Dropdown, Menu } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaSort } from 'react-icons/fa'
import _ from 'lodash'
import './style.css'

const NavbarIn = (props) => {
    const history = useHistory()
    const [nameUserNya, setNameUser] = useState()
    const [prodcutItems, setProductItems] = useState([])
    const [query, setQuery] = useState(false)
    const NameUser = async () => {
        const pathname = history.location.pathname
        const split = pathname.split('/')
        const result = split[split.length - 1]
        const { data } = await getData(`/user?detail=` + sessionStorage.getItem('ID'))
        setNameUser(data.result)
    }
    const itemDetail = async (e) => {
        console.log(e, 'ininnameUserNya')
        const datas = await getData('/user?detail=' + sessionStorage.getItem('ID'))
        const statusUser = datas.data.result.Status
        if (statusUser === 1) {
            const { data } = await getData('/order/' + e.idBuyer)
            // setDetailOrderIn(data.result)
            props.ChildItem(data.result)
        } else {
            props.ChildItem(e)
        }
    }
    const enterSearch = (e) => {
        const { event } = e
        const filtered = prodcutItems.filter(item => String(item.name).toLowerCase().includes(String(event).toLowerCase()))
        console.log(filtered, 'inienter')
        setProductItems(filtered)
    }
    const sort = async (e) => {
        // let data = []
        const { sort } = e
        const { data } = await getData(`/pos?urutkan=${sort}`)
        switch (sort) {
            case "Makanan":
                setProductItems(data.result)
                break;
            case "Minuman":
                setProductItems(data.result)
                break;
            case "urutkanAZ":
                const sortAZ = prodcutItems.sort((a, b) => a.name - b.name)
                console.log(sortAZ)
                setProductItems(sortAZ)
                break;
            case "Semua":
                getDataProduct()
                break;
            default:
                break;
        }
    }
    const listItemNya = () => {
        if (nameUserNya?.Status === 1) {
            return (
                <div style={{ height: "100%", overflowY: 'scroll' }} className="listProduct">
                    <div >
                        {prodcutItems.length === 0 ? (
                            <div className="p-3">
                                <div className="text-center">Menu Tidak Tersedia</div>
                            </div>
                        ) : (
                                <>
                                    {prodcutItems && prodcutItems.map((item, index) =>
                                        <a key={index} onClick={() => itemDetail(item)}>
                                            <div style={{ backgroundColor: 'rgb(138 191 187)', width: '100%' }} className="bg-product d-flex align-items-start p-2">
                                                {/* <img src={item.image ? item.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} style={{ width: 50, height: 50, borderRadius: 5 }} /> */}
                                                <div className="ml-3">
                                                    <div>#MSA{String(item.idBuyer).substring(0, 8)}</div>
                                                    <div className="mt-2">
                                                        <div>Total Harga Rp.{parseInt(item.totalPayment).toLocaleString("id-ID")}</div>
                                                        <div className="d-flex justify-content-between align-items-center" style={{ width: 230 }}>
                                                            <div>{formatDate(item.date_added)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )}
                                </>
                            )}
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ maxHeight: 505, height: "100%", overflowY: 'scroll' }} className="listProduct">
                    <div >
                        {prodcutItems.length === 0 ? (
                            <div className="p-3">
                                <div className="text-center">Menu Tidak Tersedia</div>
                            </div>
                        ) : (
                                <>
                                    {prodcutItems && prodcutItems.map((item, index) =>
                                        <a key={index} onClick={() => itemDetail(item)}>
                                            <div style={{ backgroundColor: 'rgb(138 191 187)', width: '100%' }} className="bg-product d-flex align-items-center p-2">
                                                <img src={item.image ? item.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} style={{ width: 50, height: 50, borderRadius: 5 }} />
                                                <div className="ml-3">
                                                    <div>{item.name}</div>
                                                    <div>Harga Rp.{parseInt(item.price).toLocaleString("id-ID")}</div>
                                                </div>
                                            </div>
                                        </a>
                                    )}
                                </>
                            )}
                    </div>
                </div>
            )
        }
    }
    const getDataProduct = useCallback(async () => {
        if (sessionStorage.getItem('ID')) {
            const datas = await getData('/user?detail=' + sessionStorage.getItem('ID'))
            const statusUser = datas?.data?.result?.Status
            if (statusUser === 1) {
                const status1 = await getData('/order/api')
                setProductItems(status1.data.result.sort((a, b) => a.date_added - b.date_added))
            } else {
                const { data } = await getData('/pos')
                console.log(data, 'iniwoi')
                setProductItems(data.result)
            }
        } else {
            history.push('/login')
        }
    }, [prodcutItems])

    useEffect(() => {
        NameUser()
        getDataProduct()
    }, [])
    const SearchButton = () => {
        if (nameUserNya?.Status === 1) {
            return (
                <div style={{ background: 'rgb(112 169 164)', width: "100%", maxHeight: 50 }} className="d-flex justify-content-center align-items-center p-3">
                    <div style={{ background: 'rgb(112 169 164)' }} className="d-flex align-items-center">
                        <Button style={{ borderRadius: 5, width: 200 }} onClick={() => getDataProduct()}>Refresh</Button>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{ background: 'rgb(112 169 164)', width: "100%", maxHeight: 50 }} className="d-flex align-items-center justify-content-center">
                    <div style={{ background: 'rgb(112 169 164)' }} className="d-flex align-items-center justify-content-between">
                        <div className="p-1">
                            <AiOutlineSearch style={{ fontSize: 18, color: '#FFF' }} />
                        </div>
                        <Input style={{ width: 182, border: 'none' }} placeholder="Cari Disini" className="input-search" onChange={(e) => !e.target.value && getDataProduct()} onPressEnter={(e) => enterSearch({ event: e.target.value })} />
                        <div className="d-flex">
                            <Dropdown
                                // @ts-ignore
                                trigger={'click'} overlay={(
                                    <Menu>
                                        <Menu.Item>
                                            <a onClick={() => sort({ "sort": "Semua" })}>Tampilkan Semua</a>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a onClick={() => sort({ "sort": "Makanan" })}>Makanan</a>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a onClick={() => sort({ "sort": "Minuman" })}>Minuman</a>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a onClick={() => sort({ "sort": "urutkanAZ" })}>Urutkan A-Z</a>
                                        </Menu.Item>
                                    </Menu>)}>
                                <Button ghost={false} style={{ border: 'none', boxShadow: 'none', background: 'rgb(112 169 164)' }} className="button-icon">
                                    <FaSort style={{ color: "#FFF" }} />
                                </Button>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            )
        }
    }
    return (
        <Fragment>
            <div style={{ width: "100%", height: '100%' }} className="listProduct-bg" >
                <div style={{ background: 'rgb(112 169 164)', width: "100%", maxHeight: 50 }} className="d-flex align-items-center justify-content-between p-3">
                    {SearchButton()}
                </div>
                <div style={{ height: '68%', background: '#70A9A4' }}>
                    {listItemNya()}
                </div>
            </div>
        </Fragment>
    )
}

export default withRouter(NavbarIn)