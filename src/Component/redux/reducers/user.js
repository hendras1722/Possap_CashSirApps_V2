
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

        // console.log(action.payload)
        default:
            return state;
    }
}

export default user;