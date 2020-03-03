import axios from 'axios';

export const getCategory = () => {
    return {
        type: "GET_CATEGORY",
        payload: axios({
            method: "GET",
            url: `http://localhost:4000/category`
        })
    }
}

export const searchCategory = (id) => {
    return {
        type: "GET_SEARCHCATEGORY",
        payload: axios({
            method: "GET",
            url: `http://localhost:4000/category/?name=${id}`
        })
    }
}

export const postCategory = (data) => {
    return {
        type: "POST_POSTCATEGORY",
        payload: axios({
            method: "POST",
            url: "http://localhost:4000/category",
            data: data
        })
    }
}

export const deleteCategory = (categoryId) => {
    return {
        type: "DELETE_CATEGORY",
        payload: axios({
            method: "DELETE",
            url: `http://localhost:4000/category/${categoryId}`
        })
    }
}

export const updateCategory = (idCategorys, data) => {
    return {
        type: "UPDATE_CATEGORY",
        payload: axios({
            method: "PATCH",
            url: `http://localhost:4000/category/${idCategorys}`,
            data: data
        })
    }
}


export const sortCategory = (productId) => {
    return {
        type: "GET_SORTPRODUCTS",
        payload: axios({
            method: "GET",
            url: `http://localhost:4000/pos?id_category=${productId}`
        })
    }
}