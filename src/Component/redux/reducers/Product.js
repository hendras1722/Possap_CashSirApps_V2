
const initialState = {
    products: []

}

const product = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {
        case 'GET_PRODUCTS_PENDING':
            return {
                ...state
            }
        case 'GET_PRODUCTS_REJECTED':
            return {
                ...state
            }
        case 'GET_PRODUCTS_FULFILLED':
            //    console.log(action.payload);
            return {
                ...state,
                products: action.payload.data.result
            }

        case 'POST_PRODUCTS_PENDING':
            return {
                ...state
            }

        case 'POST_PRODUCTS_REJECTED':
            return {
                ...state
            }

        case 'POST_PRODUCTS_FULFILLED':
            const newDataBook = [...state.products, action.payload.data];
            return {
                ...state,
                products: newDataBook
            }
        default:
            return state;
    }
}

export default product;