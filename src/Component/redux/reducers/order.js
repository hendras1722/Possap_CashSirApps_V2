const initialState = {
    orders: [],
    order: [],
    isLoading: false

}

const order = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {

        case 'POST_ORDERCHECKOUT_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'POST_ORDERCHECKOUT_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'POST_ORDERCHECKOUT_FULFILLED':
            return {
                ...state,
                orders: action.payload.data.result
            }

        case 'GET_ORDER_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_ORDER_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_ORDER_FULFILLED':
            // console.log(this.state.orders)
            return {
                ...state,
                order: action.payload.data.result
            }
        default:
            return state;
    }
}

export default order;