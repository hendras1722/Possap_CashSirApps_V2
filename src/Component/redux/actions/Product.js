import axios from 'axios';

export const getProducts = () => {
    return {
        type: 'GET_PRODUCTS',
        payload: axios({
            method: "GET",
            url: "http://localhost:4000/pos"
        })
    }
}

export const postProducts = (data) => {
    return {
        type: 'CREATE_PRODUCTS',
        payload: axios({
            method: "POST",
            url: "http://localhost:4000/pos",
            data: data
        })
    }
}

export const searchProduct = (data) => {
    return {
        type: 'GET_SEARCHPRODUCTS',
        payload: axios({
            method: "GET",
            url: `http://localhost:4000/pos/?name=${data}`,
        })
    }
}

export const deleteProducts = (productId) => {
    return {
        type: "DELETE_PRODUCTS",
        payload: axios({
            method: "DELETE",
            url: `http://localhost:4000/pos/${productId}`
        })
    }
}

export const updateProduct = (idGet, data) => {
    console.log(data)
    return {
        type: "UPDATE_PRODUCT",
        payload: axios({
            method: "PATCH",
            url: `http://localhost:4000/pos/${idGet}`,
            data: data
        })
    }
}