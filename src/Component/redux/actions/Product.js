import axios from 'axios';


export const getProducts = () => {
    const authorization = localStorage.getItem('token');
    const userId = localStorage.getItem("user-id");
    return {
        type: 'GET_PRODUCTS',
        payload: axios({
            method: "GET",
            url: `http://localhost:4000/pos`,
            headers: {
                "authorization": authorization,
                "user-id": userId
            }
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

export const searchProduct = (name, idCategory, page) => {
    console.log(searchProduct)
    return {
        type: 'GET_SEARCHPRODUCTS',
        payload: axios({
            method: "GET",
            url: `http://localhost:4000/pos?name=${name}&idCat=${idCategory}&orderBy=ASC`,
        })
    }
}
export const sortProduct = (data) => {
    return {
        type: 'GET_SORTPRODUCTS',
        payload: axios({
            method: "GET",
            url: `http://localhost:4000/pos?idCat=${data}&orderBy=ASC`,
        })
    }
}

export const orderBy = (data) => {
    return {
        type: 'GET_ORDERPRODUCTS',
        payload: axios({
            method: "GET",
            url: `http://localhost:4000/pos?orderBy=${data}`
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

export const paginationProduct = (page) => {
    return {
        type: 'PAGINATION',
        payload: axios({
            method: 'GET',
            url: `http://localhost:4000/pos?page=${page}`,
        })
    }
}