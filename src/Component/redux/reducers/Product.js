
const initialState = {
    products: [],
    productId: null,
    pagination: [],
    isLoading: false

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
                products: action.payload.data.result
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
            return {
                ...state,
                products: action.payload.data.result
            }

        case 'CREATE_PRODUCTS_PENDING':
            return {
                ...state
            }

        case 'CREATE_PRODUCTS_REJECTED':
            return {
                ...state
            }

        case 'CREATE_PRODUCTS_FULFILLED':
            console.log(action.payload.data);
            console.log(state.products)
            const DataProduct = [...state.products, action.payload.data.result];
            return {
                ...state,
                isLoading: false,
                products: DataProduct
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
            console.log(action.payload.data)
            return {
                ...state,
                isLoading: false,
                products: newProductAfterDelete
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
            const newProductAfterUpdate = state.products.map(product => {
                if (product.id === action.payload.data.result.id) {
                    return action.payload.data.result;
                }

                return product;
            })
            return {
                ...state,
                isLoading: false,
                products: newProductAfterUpdate
            }

        // console.log(action.payload)
        default:
            return state;
    }
}

export default product;