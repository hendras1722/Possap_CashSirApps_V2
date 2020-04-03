import axios from 'axios';

export const getUser = () => {
    return {
        type: 'GET_USER',
        payload: axios({
            method: "GET",
            url: "http://18.232.100.68/user/"
        })
    }
}

export const deleteUser = (userId) => {
    return {
        type: "DELETE_USERS",
        payload: axios({
            method: "DELETE",
            url: `http://18.232.100.68/user/${userId}`
        })
    }
}

export const updateUser = (idUsers, data) => {
    return {
        type: "UPDATE_USERS",
        payload: axios({
            method: "PATCH",
            url: `http://18.232.100.68/user/${idUsers}`,
            data: data
        })
    }
}

export const registerUser = (data) => {
    return {
        type: "CREATE_USER",
        payload: axios({
            method: "POST",
            url: "http://18.232.100.68/user/register",
            data: data
        })
    }
}