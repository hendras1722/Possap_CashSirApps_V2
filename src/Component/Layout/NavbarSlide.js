import React, { Fragment, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getData } from '../../utils/getUser'
import { Input, Button, Dropdown, Menu } from 'antd'
import { AiOutlineSearch } from 'react-icons/ai'
import { FaSort } from 'react-icons/fa'
import _ from 'lodash'
import './style.css'

const NavbarIn = (props) => {
    const history = useHistory()
    const [nameUser, setNameUser] = useState()
    const [prodcutItems, setProductItems] = useState([])
    const NameUser = async () => {
        const pathname = history.location.pathname
        const split = pathname.split('/')
        const result = split[split.length - 1]
        console.log(result)
        const { data } = await getData(`/user?detail=${result}`)
        setNameUser(data.result)
    }
    const itemDetail = (e) => {
        props.ChildItem(e)
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
    const getDataProduct = async () => {
        const { data } = await getData('/pos')
        setProductItems(data.result)
    }
    useEffect(() => {
        // NameUser()
        getDataProduct()
    }, [])
    return (
        <Fragment>
            <div style={{ width: "100%" }} className="listProduct-bg" >
                <div style={{ background: 'rgb(112 169 164)', width: "100%", maxHeight: 50 }} className="d-flex align-items-center justify-content-between p-3">
                    <div style={{ background: 'rgb(112 169 164)' }} className="d-flex align-items-center">
                        <div className="p-1">
                            <AiOutlineSearch style={{ fontSize: 18, color: '#FFF' }} />
                        </div>
                        <Input style={{ width: 180, border: 'none' }} placeholder="Cari Disini" className="input-search ml-3" onChange={(e) => !e.target.value && getDataProduct()} onPressEnter={(e) => enterSearch({ event: e.target.value })} />
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
            </div>
        </Fragment>
    )
}

export default NavbarIn