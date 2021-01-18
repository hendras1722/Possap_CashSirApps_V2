import axios from 'axios';

const { REACT_APP_API_URL } = process.env

export const getCategory = () => {
    const authorization = localStorage.getItem('token');
    const userId = localStorage.getItem("user-id");
    return {
        type: "GET_CATEGORY",
        payload: axios({
            method: "GET",
            url: `${REACT_APP_API_URL}/category`,
            headers: {
                "authorization": authorization,
                "user-id": userId
            }
        })
    }
}

export const searchCategory = (id) => {
    return {
        type: "GET_SEARCHCATEGORY",
        payload: axios({
            method: "GET",
            url: `${REACT_APP_API_URL}/category/?name=${id}`
        })
    }
}

export const postCategory = (data) => {
    return {
        type: "POST_POSTCATEGORY",
        payload: axios({
            method: "POST",
            url: "${REACT_APP_API_URL}/category",
            data: data
        })
    }
}

export const deleteCategory = (categoryId) => {
    return {
        type: "DELETE_CATEGORY",
        payload: axios({
            method: "DELETE",
            url: `${REACT_APP_API_URL}/category/${categoryId}`
        })
    }
}

export const updateCategory = (idCategorys, data) => {
    return {
        type: "UPDATE_CATEGORY",
        payload: axios({
            method: "PATCH",
            url: `${REACT_APP_API_URL}/category/${idCategorys}`,
            data: data
        })
    }
}


export const sortCategory = (productId) => {
    return {
        type: "GET_SORTPRODUCTS",
        payload: axios({
            method: "GET",
            url: `${REACT_APP_API_URL}/pos?id_category=${productId}`
        })
    }
}