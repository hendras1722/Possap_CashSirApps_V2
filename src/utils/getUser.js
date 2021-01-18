import axios from 'axios'

let initialState = {}
let getToken = {}

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