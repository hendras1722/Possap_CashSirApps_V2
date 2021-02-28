import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { Table, Image, Input, Button, Modal, Tag } from 'antd'
import { getData, deleteData } from '../../utils/getUser'
import ModalNew from '../Layout/ModalNew'
import { HiPlusCircle } from 'react-icons/hi'
import { GrUpdate, GrFormTrash } from 'react-icons/gr'
import Swal from 'sweetalert2'

const ProductAdmin = () => {
    const [produkU, setProdukU] = useState([])
    const [searchProduk, setSearchProduk] = useState([])
    const [modal, setModal] = useState(false)
    const [updateDatas, setUpdateDatas] = useState({})
    const [query, setQuery] = useState("OKOK")

    const getProduct = async (e) => {
        const { data } = await getData('/pos')
        const Item = data.result
        setProdukU(Item.sort((a, b) => {
            if (a.name < b.name)
                return -1
        }))
        if (e) {
            const filtered = Item.filter(item => String(item.name).toLowerCase().includes(String(e).toLowerCase()))
            console.log(filtered)
            setProdukU(filtered)
        }
    }
    const updateData = (e) => {
        setModal(true)
        setUpdateDatas(e)
    }
    const OpenData = () => {
        setModal(true)
        setUpdateDatas(null)
    }
    useEffect(() => {
        getProduct()
    }, [modal])
    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Nama Produk',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Gambar Produk',
            dataIndex: 'image',
            key: 'image',
            render: (text, record) => <Image src={record.image} width={80} height={40} />
        },
        {
            title: 'Sedia',
            dataIndex: 'stock',
            key: 'stock',
            render: (text, record) => record.stock > 0 ? <Tag color="green">Tersedia</Tag> : <Tag color="red">Tidak Tersedia</Tag>
        },
        {
            title: 'Harga',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => <Tag color="geekblue">Rp.{Number(record.price).toLocaleString('id-ID')}</Tag>
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            fixed: 'right',
            width: 200,
            render: (text, record) => (
                <div className="d-flex">
                    <Button className="btn-active" style={{ backgroundColor: '#a0d911', color: "#FFF", boxShadow: '6px 9px 7px -1px rgba(0,0,0,0.32)' }} onClick={() => updateData(record)} icon={<GrUpdate style={{ fontSize: 12, marginRight: 5, color: '#FFF' }} />}>Update</Button>
                    <Button onClick={() => deleteDatas(record.id)} style={{ backgroundColor: '#f5222d', color: '#FFF', boxShadow: '6px 9px 7px -1px rgba(0,0,0,0.32)' }} className="btn-active" icon={<GrFormTrash style={{ fontSize: 20, marginRight: 5, color: '#FFF' }} />}>Delete</Button>
                </div>
            )
        },
    ];
    const deleteDatas = (e) => {
        Swal.fire({
            title: 'Apakah Yakin',
            text: "Produk akan terhapus secara permanent",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(`/pos/${e}`).then(res => {
                    // console.log(res, 'inidelete')
                    getProduct()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data Berhasil Didelete',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
            }
        })
    }
    const handleCancel = () => {
        setModal(false)
    }
    return (
        <Fragment>
            <div>
                <div className="d-flex justify-content-between">
                    <Input onChange={(e) => getProduct(e.target.value)} style={{ width: 300 }} placeholder="Cari Produk" />
                    <Button onClick={() => OpenData()} style={{ backgroundColor: '#1890ff', color: '#FFF', boxShadow: '6px 9px 7px -1px rgba(0,0,0,0.32)' }} className="btn-active" icon={<HiPlusCircle style={{ fontSize: 18, marginRight: 5 }} />}>Add Product</Button>
                </div>
                <div className="mt-3">
                    <Table columns={columns} dataSource={produkU.map((item, index) => { return { ...item, index: index + 1 } })} pagination={{ pageSize: 5 }} scroll={{ y: 300 }} />
                </div>
                {modal &&
                    <Modal title={updateDatas ? "Update Produk" + " " + (updateDatas.name) : "Tambah Produk"} visible={modal} onCancel={() => handleCancel()} footer={null}>
                        <ModalNew name="add" modal={modal} handleCancel={handleCancel} updateDatas={updateDatas ? updateDatas : ''} />
                    </Modal>
                }
            </div>
        </Fragment >
    )
}

export default ProductAdmin;