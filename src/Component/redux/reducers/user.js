
const initialState = {
    users: [],
    isLoading: false

}

const user = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case 'GET_USER_PENDING':
            return {
                ...state
            }
        case 'GET_USER_REJECTED':
            return {
                ...state
            }
        case 'GET_USER_FULFILLED':
            console.log(action.payload.data.result);
            return {
                ...state,
                users: action.payload.data.result
            }

        case 'DELETE_USERS_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'DELETE_USERS_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'DELETE_USERS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                users: action.payload.data.result
            }
        case 'UPDATE_USERS_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'UPDATE_USERS_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'UPDATE_USERS_FULFILLED':
            return {
                users: action.payload.data.result
            }

        case 'CREATE_USER_PENDING':
            return {
                ...state
            }

        case 'CREATE_USER_REJECTED':
            return {
                ...state
            }

        case 'CREATE_USER_FULFILLED':
            return {
                users: action.payload.data.result
            }

        // console.log(action.payload)
        default:
            return state;
    }
}

export default user;