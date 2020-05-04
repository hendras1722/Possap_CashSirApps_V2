const initialState = {
    logins: [],
    isLoading: false

}

const login = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {

        case 'POST_LOGIN_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'POST_LOGIN_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'POST_LOGIN_FULFILLED':
            return {
                ...state,
                logins: action.payload.data.result
            }

        default:
            return state;
    }
}

export default login;