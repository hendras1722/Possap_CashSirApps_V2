import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { Table, Image, Input, Button, Modal } from 'antd'
import { getData } from '../../utils/getUser'
import ModalNew from '../Layout/ModalNew'

const ProductAdmin = () => {
    const [produkU, setProdukU] = useState([])
    const [searchProduk, setSearchProduk] = useState([])
    const [modal, setModal] = useState(false)
    const [query, setQuery] = useState("OKOK")

    const getProduct = async (e) => {
        const { data } = await getData('/pos')
        const Item = data.result
        setProdukU(Item)
        if (e) {
            const filtered = Item.filter(item => String(item.name).toLowerCase().includes(String(e).toLowerCase()))
            console.log(filtered)
            setProdukU(filtered)
        }
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
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Harga',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => <div>Rp.{Number(record.price).toLocaleString('id-ID')}</div>
        },
        {
            title: 'Action',
            dataIndex: 'address',
            key: 'address',
            fixed: 'right',
            width: 100
        },
    ];
    const handleCancel = () => {
        setModal(false)
    }
    return (
        <Fragment>
            <div>
                <div className="d-flex justify-content-between">
                    <Input onChange={(e) => getProduct(e.target.value)} style={{ width: 300 }} placeholder="Cari Produk" />
                    <Button onClick={() => setModal(true)}>Add Product</Button>
                </div>
                <div className="mt-3">
                    <Table columns={columns} dataSource={produkU.map((item, index) => { return { ...item, index: index + 1 } })} pagination={{ pageSize: 5 }} scroll={{ y: 300 }} />
                </div>
                {modal ? (
                    <Modal title="Tambah Produk" visible={modal} onCancel={() => handleCancel()} footer={null}>
                        <ModalNew name="add" modal={modal} handleCancel={handleCancel} />
                    </Modal>
                ) : (null)}
            </div>
        </Fragment >
    )
}

export default ProductAdmin;