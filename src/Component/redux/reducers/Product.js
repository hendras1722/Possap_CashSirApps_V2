
const initialState = {
    products: [],
    productId: null,
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
        case 'GET_SEARCHPRODUCTS_FULFILLED':
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
            const newProductAfterDelete = state.products.filter(product => product.id !== action.payload.data.result);
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

        default:
            return state;
    }
}

export default product;