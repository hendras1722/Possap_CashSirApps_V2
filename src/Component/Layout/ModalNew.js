import React, { Fragment, useEffect, useState, useCallback } from 'react'
import { Modal, Input, Form, Button, Select } from 'antd'
import './style.css'
import Swal from 'sweetalert2'
import { postData, getData, updateData } from '../../utils/getUser'

const ModalNew = (props) => {
    const { name, modal, handleCancel, updateDatas } = props
    const { TextArea } = Input
    const { Option } = Select
    const [readUpload, setReadUpload] = useState('')
    const [updateProduk, setUpdateProduk] = useState({})
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        let data = new FormData()
        if (updateDatas) {
            data.append("id", updateDatas.id)
        }
        data.append("name", values.NameProduk)
        data.append("description", values.Deskripsi)
        data.append("price", parseInt(values.Price))
        data.append("stock", values.Stock)
        data.append("id_category", values.Category)
        data.append("image", values.Upload)
        if (updateDatas) {
            updateData(`/pos/${updateDatas.id}`, data).then(res => {
                console.log(res.data, 'inires')
                const { affectedRows } = res.data.result
                if (affectedRows === 0) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: "Gagal Update",
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    setUpdateProduk({})
                    handleCancel()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data Berhasil Diupdate',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch(e => {
                console.error(e.message)
            })
        } else {
            postData('/pos', data).then(res => {
                console.log(res.data, 'inires')
                const { message } = res.data.result
                if (message) {
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                } else {
                    setUpdateProduk({})
                    handleCancel()
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Data Berhasil Ditambah',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            }).catch(e => {
                console.error(e.message)
            })
        }
    };


    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        if (updateDatas) {
            form.setFieldsValue({ Category: updateDatas.id_category, NameProduk: updateDatas.name, Price: updateDatas.price, Upload: updateDatas.image, Deskripsi: updateDatas.description, Stock: updateDatas.stock })
            setUpdateProduk({ Category: updateDatas.id_category, NameProduk: updateDatas.name, Price: updateDatas.price, Upload: updateDatas.image, Deskripsi: updateDatas.description, Stock: updateDatas.stock })
        }
    }, [updateDatas])
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
    const UpdateInput = (e) => {
        console.log(e, 'inieeee')
        switch (e) {
            case "NameProduk":
                return updateProduk.NameProduk
                break;
            case "Stock":
                return updateProduk.Stock
                break;
            case "Price":
                return updateProduk.Price
            default:
                break;
        }
    }
    const HandleChangeCateogry = (value) => {
        form.setFieldsValue({ Category: value });
    }
    const HandleChangeStock = (value) => {
        form.setFieldsValue({ Stock: value });
    }
    const selectComponent = (e) => {
        let category = [{ value: 1, label: "Minuman" }, { value: 2, label: "Makanan" }]
        let stock = [{ value: 999999999999999, label: "Tersedia" }, { value: 0, label: "Tidak Tersedia" }]
        switch (e) {
            case "Category":
                return (
                    <Select style={{ width: 350 }} onChange={HandleChangeCateogry} defaultValue={updateProduk.Category ? updateProduk.Category : null} allowClear>
                        {category.map((item, index) =>
                            <Option value={item.value}>{item.label}</Option>
                        )}
                    </Select>
                )
                break;
            case "Stock":
                return (
                    <Select style={{ width: 350 }} onChange={HandleChangeStock} defaultValue={updateProduk.Stock > 0 ? "Tersedia" : updateProduk.Stock < 0 ? "Tidak Tersedia" : null} allowClear>
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
                <TextArea style={{ width: 350 }} defaultValue={updateProduk.Deskripsi} />
            </div>
        )
    }
    const handleUpload = (e) => {
        let formData = new FormData()
        formData.append('image', e.target.files[0])
        postData('/hdfs/upload', formData).then(res => {
            setReadUpload(res.data.result.url)
            form.setFieldsValue({ Upload: res.data.result.url });
        }).catch(e => {
            console.error(e.message)
        })
    }
    const UploadImage = () => {
        const urli = readUpload.split("-")[1]
        return (
            <div style={{ width: 350 }} className="d-flex">
                <Input defaultValue={urli || updateProduk.Upload && updateProduk.Upload.split("-")[1] || "Masukkan File"} disabled />
                <Button onClick={() => document.getElementById('Image').click()}>
                    Upload</Button>
                <Input id="Image" type="file" name="Image" className="d-none" accept="image/*" onChange={handleUpload} />
            </div>
        )
    }
    const modalAdd = () => {
        return (
            <Form name="add" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{ NameProduk: null }}>
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
                                                <Input style={{ width: 350 }} defaultValue={UpdateInput(item.name)} />
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