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
        type: 'POST_PRODUCTS',
        payload: axios({
            method: "POST",
            url: "http://localhost:4000/pos/",
            data: data
        })
    }
}
