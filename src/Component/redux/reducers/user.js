
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
            // console.log(action.payload.data.result);
            return {
                ...state,
                users: action.payload.data.result
            }

        case 'DELETE_PRODUCTS_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'DELETE_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'DELETE_PRODUCTS_FULFILLED':
            const newUserAfterDelete = state.users.filter(user => user.id !== action.payload.data.result.id);
            return {
                ...state,
                isLoading: false,
                users: newUserAfterDelete
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
            const newUserAfterUpdate = state.users.map(user => {
                if (user.id === action.payload.data.result.idUser) {
                    return action.payload.data.result;
                }

                return user;
            })

        case 'CREATE_USER_PENDING':
            return {
                ...state
            }

        case 'CREATE_USER_REJECTED':
            return {
                ...state
            }

        case 'CREATE_USER_FULFILLED':
            console.log(action.payload.data);
            console.log(state.products)
            const DataUser = [...state.users, action.payload.data.result];
            return {
                ...state,
                isLoading: false,
                users: DataUser
            }

        // console.log(action.payload)
        default:
            return state;
    }
}

export default user;