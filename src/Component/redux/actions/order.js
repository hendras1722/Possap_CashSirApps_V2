import axios from 'axios'
require('dotenv').config()

export const orderCheckout = (data) => {
    return {
        type: 'POST_ORDERCHECKOUT',
        payload: axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/order`,
            data: data
        })
    }
}

export const readCheckout = () => {
    return {
        type: 'GET_ORDER',
        payload: axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/order`
        })
    }
}

export const readHistory = () => {
    return {
        type: 'GET_ORDERCHECKOUT',
        payload: axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/order/api/`
        })
    }
}