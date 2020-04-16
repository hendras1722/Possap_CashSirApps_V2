const initialState = {
    cart: [],
    total: 0
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            let filterCartId = state.cart.map(cart => {
                if (cart.id === action.payload.id) {
                    cart.qty += 1
                    return action.payload
                }
                return cart
            })

            let existedCartData = state.cart.find(product => product.id === action.payload.id)
            if (existedCartData) {
                return {
                    ...state,
                    cart: filterCartId,
                    total: state.total + action.payload.price
                }
            }
            else {
                let newTotal = state.total + action.payload.price
                action.payload.qty = 1
                return {
                    ...state,
                    cart: [...state.cart, action.payload],
                    total: newTotal
                }
            }

        case 'ADD_QTY':
            const addQty = state.cart.map(product => {
                if (product.id === action.payload) {
                    product.qty += 1
                }
                return product
            })
            let existedCartAdd = state.cart.find(product => product.id === action.payload)
            if (existedCartAdd) {
                return {
                    ...state,
                    cart: addQty,
                    total: state.total + existedCartAdd.price
                }
            }
        /* falls through */
        case 'REDUCE_QTY':
            const newQty = state.cart.map(cart => {
                if (cart.id === action.payload) {
                    cart.qty = cart.qty - 1
                }
                return cart
            })
            let existedCartReduce = state.cart.find(product => product.id === action.payload)
            if (existedCartReduce.qty <= 0) {
                existedCartReduce.qty = 1
                return {
                    ...state,
                }
            } else {
                return {
                    ...state,
                    cart: newQty,
                    total: state.total - existedCartReduce.price
                }
            }


        case 'DELETE_CART_DATA':
            const filterCartIdForDelete = state.cart.filter(product => product.id !== action.payload)
            let existedCartDelete = state.cart.find(product => product.id === action.payload)
            if (existedCartDelete) {
                return {
                    ...state,
                    cart: filterCartIdForDelete,
                    total: state.total - existedCartDelete.price * existedCartDelete.qty
                }
            }

        /* falls through */
        default:
            return state
    }
}

export default cart;