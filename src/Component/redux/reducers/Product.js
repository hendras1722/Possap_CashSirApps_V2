const initialState = {
    products: [],
    productId: null,
    pagination: [],
    isLoading: false,
    hide: false
}

const product = (state = initialState, action) => {
    // console.log(action.type);
    switch (action.type) {


        case 'GET_SEARCHPRODUCTS_PENDING':
            return {
                ...state

            }
        case 'GET_SEARCHPRODUCTS_REJECTED':
            return {
                ...state
            }
        case 'PAGINATION_FULFILLED':
            return {
                ...state,
                products: action.payload.data.result,
                pagination: action.payload.data.totalPages
            }
        case 'GET_SEARCHPRODUCTS_FULFILLED':
            // console.log(action.payload.data.result);
            return {
                ...state,
                products: action.payload.data.result,
                pagination: action.payload.data.totalPages
            }
        case 'GET_ORDERPRODUCTS_PENDING':
            return {
                ...state
            }
        case 'GET_ORDERPRODUCTS_REJECTED':
            return {
                ...state
            }
        case 'GET_ORDERPRODUCTS_FULFILLED':
            // console.log(action.payload.data.result);
            return {
                ...state,
                products: action.payload.data.result
            }

        case 'GET_SORTPRODUCTS_PENDING':
            return {
                ...state
            }
        case 'GET_SORTPRODUCTS_REJECTED':
            return {
                ...state
            }
        case 'GET_SORTPRODUCTS_FULFILLED':
            // console.log(action.payload.data.result);
            return {
                ...state,
                products: action.payload.data.result
            }

        case 'GET_PRODUCTS_PENDING':
            return {
                ...state
            }
        case 'GET_PRODUCTS_REJECTED':
            return {
                ...state
            }
        case 'GET_PRODUCTS_FULFILLED':
            // console.log(action.payload.data.result);
            if (localStorage.getItem('Status') === '1') {
                return {
                    ...state,
                    products: action.payload.data.result,
                    pagination: action.payload.data.totalPages,
                    hide: false
                }
            } else if (localStorage.getItem('Status') === '2') {
                return {
                    ...state,
                    products: action.payload.data.result,
                    pagination: action.payload.data.totalPages,
                    hide: true
                }
            }
        /* falls through */
        case 'CREATE_PRODUCTS_PENDING':
            return {
                ...state
            }

        case 'CREATE_PRODUCTS_REJECTED':
            return {
                ...state
            }

        case 'CREATE_PRODUCTS_FULFILLED':
            return {
                products: action.payload.data.result,
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
            const newProductAfterDelete = state.products.filter(product => product.id !== action.payload.data.result.id);
            return {
                ...state,
                pagination: action.payload.data.totalPages,
                isLoading: false,
                products: newProductAfterDelete,
            }

        case 'UPDATE_PRODUCTS_PENDING':
            return {
                ...state,
                isLoading: true
            }

        case 'UPDATE_PRODUCTS_REJECTED':
            return {
                ...state,
                isLoading: true
            }

        case 'UPDATE_PRODUCTS_FULFILLED':
            return {
                products: action.payload.data.result
            }

        // console.log(action.payload)
        default:
            return state;
    }
}

export default product;