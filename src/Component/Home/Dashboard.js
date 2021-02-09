import React, { Fragment, useEffect, useState } from 'react'
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { getData } from '../../utils/getUser'
import { Tabs, Select } from 'antd'
import { withRouter } from 'react-router-dom'

const { Option } = Select
const { TabPane } = Tabs;
const Dashboard = () => {
    const [dataChart, setDataChart] = useState({})
    const [dataOrder, setOrder] = useState({})
    const [dataOrderMonth, setOrderMonth] = useState({})
    const [dataBulanan, setdataBulanan] = useState('')
    const [filterBulanan, setfilterBulanan] = useState([])
    const [itemProduk, setProduk] = useState([])
    const [itemOrderAPI, setItemOrderAPi] = useState([])

    const monthPrice = async (e) => {
        const { data } = await getData('/order/sumpricemonth')

        let filterIn = data.result.map(item => item.year)
        setfilterBulanan([...new Set(filterIn)].reverse())
        let Tanggal = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        if (e) {
            let filterYear = data.result.filter(item => String(item.year).includes(e))
            let monthFilter = filterYear.map(item => Tanggal[item.month - 1])
            let mapping = filterYear.map(item => String(item.Price))
            console.log(monthFilter)
            // setdataBulanan(filterYear)
            setOrderMonth({
                labels: monthFilter,
                datasets: [
                    {
                        label: "Total",
                        data: mapping,
                        backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                        borderWidth: 4
                    }
                ]
            });

        }
    }

    useEffect(() => {
        monthPrice()
        const orderAPi = async () => {
            const { data } = await getData('/order/api')
            setItemOrderAPi(data.result)
        }
        const produk = async () => {
            const { data } = await getData('/pos')
            setProduk(data.result)
        }
        const fetDataJualan = async () => {
            let pricing = [];
            let year = [];
            getData('/order/sumprice').then(response => {
                console.log(response)
                for (const dataObj of response.data.result) {
                    pricing.push(parseInt(dataObj.Price));
                    year.push(parseInt(dataObj.year));
                }
                setOrder({
                    labels: year,
                    datasets: [
                        {
                            label: year,
                            data: pricing,
                            backgroundColor: ["rgba(75, 192, 192, 0.6)"],
                            borderWidth: 4
                        }
                    ]
                });
            })
            // console.log(data, 'indate')
        }
        const fetData = async () => {
            const { data } = await getData('/user')
            let status1 = data.result.filter(item => item.Status === 1)
            let status2 = data.result.filter(item => item.Status === 2)
            let status3 = data.result.filter(item => item.Status === 3)
            let arrayUser = [status1.length, status2.length, status3.length]
            console.log(status1, status2, status3)
            setDataChart({
                labels: ["Kasir", "Pembeli", "Admin"],
                datasets: [{
                    label: ["Kasir", "Pembeli", "Admin"],
                    data: arrayUser,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56'
                    ]
                }],
                backgroundColor: "rgba(220,220,220,1)",
            })
        }
        fetData()
        orderAPi()
        produk()
        fetDataJualan()
    }, [])

    return (
        <Fragment>
            <div className="d-flex justify-content-around">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="User" key="1">
                        <div className="mt-3" style={{ width: 500, height: '100%', }}>
                            <Doughnut data={dataChart} />
                        </div>
                    </TabPane>
                    <TabPane tab="Rekap (Tahunan)" key="2">
                        <div className="mt-3" style={{ width: 500, height: '100%', }}>
                            <Line data={dataOrder} />
                        </div>
                    </TabPane>
                    <TabPane tab="Rekap (Bulanan)" key="3">
                        <div className="d-flex justify-content-center ">
                            <Select onChange={monthPrice} style={{ width: 200 }} placeholder="Tahun">
                                {filterBulanan && filterBulanan.map((item, index) =>
                                    // <button key={index} onClick={() => monthPrice(item)} className="mr-2">{item}</button>
                                    <Option key={index} value={item}>{item}</Option>
                                )}
                            </Select>
                        </div>
                        <div className="mt-3" style={{ width: 500, height: '100%', }}>
                            <Bar data={dataOrderMonth} />
                        </div>
                    </TabPane>
                </Tabs>


                <div className="d-block">
                    <div style={{ background: '#303fc2', width: 230, height: 150, opacity: '50%', borderRadius: 10 }}>
                        <div className="text-white p-2" style={{ borderBottom: '1px solid white' }}>
                            <div>Produk</div>
                        </div>
                        <div className="text-white ml-2" style={{ fontSize: 80 }}>{itemProduk.length > 0 ? itemProduk.length : 0}<span style={{ fontSize: 15 }}>item</span></div>
                    </div>
                    <div className="mt-3" style={{ background: '#303fc2', width: 230, height: 150, opacity: '50%', borderRadius: 10 }}>
                        <div className="text-white p-2" style={{ borderBottom: '1px solid white' }}>
                            <div>Total Penjualan</div>
                        </div>
                        <div className="text-white ml-2" style={{ fontSize: 80 }}>{itemOrderAPI.length > 0 ? itemOrderAPI.length : 0}</div>
                    </div>
                </div>
            </div>

        </Fragment>
    )
}

export default withRouter(Dashboard)