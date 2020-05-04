import axios from 'axios';

export const onLogin = (data) => {
    return {
        type: "POST_LOGIN",
        payload: axios({
            method: "POST",
            url: `http://18.232.100.68/user/login`,
            data: data
        })
    }
}