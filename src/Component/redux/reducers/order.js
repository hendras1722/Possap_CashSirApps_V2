const initialState = {
    orders: [],
    order: [],
    notif: '',
    isLoading: false

}

const order = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case 'POST_ORDERCHECKOUT':
            console.log(action.payload, 'inipayload')
            return {
                ...state,
                orders: action.payload.data?.result,
                notif: 'berhasil'
            }

        case 'GET_ORDERCHECKOUT_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_ORDERCHECKOUT_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'GET_ORDERCHECKOUT_FULFILLED':
            // console.log(this.state.orders)
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
            return {
                ...state,
                order: action.payload.data.result
            }
        default:
            return state;
    }
}

export default order;