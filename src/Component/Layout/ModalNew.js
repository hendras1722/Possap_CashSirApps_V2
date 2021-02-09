import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { Modal, Input, Form, Button, Select } from 'antd'
import './style.css'
import Swal from 'sweetalert2'
import { postData } from '../../utils/getUser'

const ModalNew = (props) => {
    const { name, modal, handleCancel } = props
    const { TextArea } = Input
    const { Option } = Select
    const [readUpload, setReadUpload] = useState('')
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        let data = new FormData()
        data.append("name", values.NameProduk)
        data.append("description", values.Deskripsi)
        data.append("price", parseInt(values.Price))
        data.append("stock", values.Stock)
        data.append("id_category", values.Category)
        data.append("image", values.Upload)
        console.log(props, 'inipros')
        postData('/pos', data).then(res => {
            handleCancel()
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Data Berhasil Ditambah',
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(e => {
            console.error(e, 'inieee')
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {

        // form.setFieldsValue({ Category: '1', NameProduk: 'okokok', Price: '1221' })
    }, [])
    const InputForm = [{
        label: "Upload Gambar",
        name: "Upload",
        required: true,
        message: "Gambar Harus Diupload"
    }, {
        label: "Nama Hidangan",
        name: "NameProduk",
        required: true,
        message: "Masukkan Nama Barang"
    }, {
        label: "Harga",
        name: "Price",
        required: true,
        message: "Masukkan Harga"
    }, {
        label: "Kategori",
        name: "Category",
        required: true,
        message: "Masukkan Kategori"
    }, {
        label: "Deskripsi",
        name: "Deskripsi",
        required: true,
        message: "Masukkan Deskripsi"
    }, {
        label: "Stock",
        name: "Stock",
        required: true,
        message: "Pilih Stock"
    }]
    const HandleChangeCateogry = (value) => {
        form.setFieldsValue({ Category: value });
    }
    const HandleChangeStock = (value) => {
        form.setFieldsValue({ Stock: value });
    }
    const selectComponent = (e) => {
        let category = [{ value: 1, label: "Makanan" }, { value: 2, label: "Minuman" }]
        let stock = [{ value: 999999999999999, label: "Tersedia" }, { value: 0, label: "Tidak Tersedia" }]
        switch (e) {
            case "Category":
                return (
                    <Select style={{ width: 350 }} onChange={HandleChangeCateogry} allowClear>
                        {category.map((item, index) =>
                            <Option value={item.value}>{item.label}</Option>
                        )}
                    </Select>
                )
                break;
            case "Stock":
                return (
                    <Select style={{ width: 350 }} onChange={HandleChangeStock} allowClear>
                        {stock.map((item, index) =>
                            <Option value={item.value}>{item.label}</Option>
                        )}
                    </Select>
                )
                break;
            default:
                break;
        }

    }
    const SelectIn = (name) => {
        switch (name.name) {
            case "Category":
                return selectComponent(name.name)
                break;
            case "Stock":
                return selectComponent(name.name)
                break;
            default:
                break;
        }
    }
    const Description = () => {
        return (
            <div className="d-block">
                <div>Minimal 12 Karakter</div>
                <TextArea style={{ width: 350 }} />
            </div>
        )
    }
    const handleUpload = (e) => {
        // form.setFieldsValue({ Upload: e.target.files[0] });
        setReadUpload(e.target.files[0])
    }
    const UploadImage = () => {
        // console.log(e.target.file, 'inie')
        return (
            <div style={{ width: 350 }} className="d-flex">
                <Input defaultValue={readUpload.name || "Masukkan File"} disabled />
                <Button onClick={() => document.getElementById('Image').click()}>
                    Upload</Button>
                <Input id="Image" type="file" name="Image" className="d-none" accept="image/*" onChange={handleUpload} />
            </div>
        )
    }
    const modalAdd = () => {
        return (
            <Form name="add" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ NameProduk: null, Upload: readUpload }}>
                {InputForm.map((item, index) =>
                    <Form.Item key={index} label={item.label} name={item.name} rules={[{ required: item.required, message: item.message }]}>
                        <div className="d-flex justify-content-end">
                            {item.name === "Category" ? (
                                <SelectIn name="Category" />
                            ) : item.name === "Stock" ? (
                                <SelectIn name="Stock" />
                            ) : item.name === "Deskripsi" ? (
                                <Description />
                            ) : item.name === "Upload" ? (
                                <UploadImage />
                            ) : (
                                                <Input style={{ width: 350 }} />
                                            )}
                        </div>
                    </Form.Item>
                )}
                <Form.Item >
                    <div className="d-flex justify-content-center">
                        <Button className="btn-active" htmlType="submit" style={{ width: 300, backgroundColor: 'rgb(78, 131, 126)', color: 'white' }}>Submit</Button>
                    </div>
                </Form.Item>
            </Form>
        )
    }
    const ShowModal = () => {
        switch (name) {
            case "add":
                return modalAdd()
                break;

            default:
                break;
        }
    }
    return <ShowModal />
}

export default ModalNew;