import axios from 'axios';

export const getUser = () => {
    return {
        type: 'GET_USER',
        payload: axios({
            method: "GET",
            url: "http://localhost:4000/user/"
        })
    }
}

export const deleteUser = (userId) => {
    return {
        type: "DELETE_USERS",
        payload: axios({
            method: "DELETE",
            url: `http://localhost:4000/user/${userId}`
        })
    }
}

export const updateUser = (data) => {
    return {
        type: "POST_updateUser",
        payload: axios({
            method: "POST",
            url: "http://localhost:4000/user/register",
            data: data
        })
    }
}