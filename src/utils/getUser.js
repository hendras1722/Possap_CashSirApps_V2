import axios from 'axios'

let initialState = {}
// @ts-ignore
let getToken = {}
// @ts-ignore
let idDetailIn = {}

const { REACT_APP_API_URL } = process.env

export const getUser = () => {
    // @ts-ignore
    console.log(initialState, 'inin')
    return initialState
}

export const setUser = (params) => {
    console.log(params)
    // @ts-ignore
    return initialState = params
}

export const getData = (params) => {
    return axios.get(`${REACT_APP_API_URL}${params}`)
}

export const postData = (params, params1) => {
    return axios.post(`${REACT_APP_API_URL}${params}`, params1)
}

export const formatDate = (date) => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "Desember"
    ];
    var d = new Date(date),
        month = '' + (monthNames[d.getMonth()]),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [day, month, year].join(" ");
}

export const resultIdDetail = (params) => {
    return idDetailIn
}

export const idDetail = (params) => {
    return idDetailIn = params
}