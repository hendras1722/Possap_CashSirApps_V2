import axios from 'axios';

export const getCategory = () => {
    return {
        type: "GET_CATEGORY",
        payload: axios({
            method: "GET",
            url: `http://18.232.100.68/category`
        })
    }
}

export const searchCategory = (id) => {
    return {
        type: "GET_SEARCHCATEGORY",
        payload: axios({
            method: "GET",
            url: `http://18.232.100.68/category/?name=${id}`
        })
    }
}

export const postCategory = (data) => {
    return {
        type: "POST_POSTCATEGORY",
        payload: axios({
            method: "POST",
            url: "http://18.232.100.68/category",
            data: data
        })
    }
}

export const deleteCategory = (categoryId) => {
    return {
        type: "DELETE_CATEGORY",
        payload: axios({
            method: "DELETE",
            url: `http://18.232.100.68/category/${categoryId}`
        })
    }
}

export const updateCategory = (idCategorys, data) => {
    return {
        type: "UPDATE_CATEGORY",
        payload: axios({
            method: "PATCH",
            url: `http://18.232.100.68/category/${idCategorys}`,
            data: data
        })
    }
}


export const sortCategory = (productId) => {
    return {
        type: "GET_SORTPRODUCTS",
        payload: axios({
            method: "GET",
            url: `http://18.232.100.68/pos?id_category=${productId}`
        })
    }
}