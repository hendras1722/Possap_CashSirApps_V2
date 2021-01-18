import axios from 'axios';
import { GET_USERS, USERS_ERROR } from "../types";

require('dotenv').config()

export const getProducts = () => async dispatch => {
    try {
        const authorization = localStorage.getItem('token');
        const userId = localStorage.getItem("user-id");
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/category`)
        dispatch({
            type: GET_USERS,
            payload: res.data.result
        })
    } catch (error) {
        dispatch({
            type: USERS_ERROR,
            payload: console.log(error)
        });
    }
    // return {
    //     type: GET_USERS,
    //     payload: axios({
    //         method: "GET",
    //         url: `${process.env.REACT_APP_API_URL}/pos`,
    //         headers: {
    //             "authorization": authorization,
    //             "user-id": userId
    //         }
    //     })
    // }
}

export const postProducts = (data) => {
    return {
        type: 'CREATE_PRODUCTS',
        payload: axios({
            method: "POST",
            url: `${process.env.REACT_APP_API_URL}/pos`,
            data: data
        })
    }
}

// export const searchProduct = (name, idCategory, page) => {
//     console.log(searchProduct)
//     const authorization = localStorage.getItem('token');
//     const userId = localStorage.getItem("user-id");
//     return {
//         type: 'GET_SEARCHPRODUCTS',
//         payload: axios({
//             method: "GET",
//             url: `${process.env.REACT_APP_API_URL}/pos?name=${name}&idCat=${idCategory}&orderBy=ASC`,
//             headers: {
//                 "authorization": authorization,
//                 "user-id": userId
//             }
//         })
//     }
// }
export const sortProduct = (data) => {
    const authorization = localStorage.getItem('token');
    const userId = localStorage.getItem("user-id");
    return {
        type: 'GET_SORTPRODUCTS',
        payload: axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/pos?idCat=${data}&orderBy=ASC`,
            headers: {
                "authorization": authorization,
                "user-id": userId
            }
        })
    }
}

export const orderBy = (data) => {
    return {
        type: 'GET_ORDERPRODUCTS',
        payload: axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/pos?orderBy=${data}`
        })
    }
}

export const deleteProducts = (productId) => {
    return {
        type: "DELETE_PRODUCTS",
        payload: axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_API_URL}/pos/${productId}`
        })
    }
}

export const updateProduct = (idGet, data) => {
    console.log(idGet)
    return {
        type: "UPDATE_PRODUCTS",
        payload: axios({
            method: "PATCH",
            url: `${process.env.REACT_APP_API_URL}/pos/${idGet}`,
            data: data
        })
    }
}

export const paginationProduct = (page) => {
    return {
        type: 'PAGINATION',
        payload: axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URL}/pos?page=${page}`,
        })
    }
}