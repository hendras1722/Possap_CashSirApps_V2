const initialState = {
    cart: [],
    total: 0
}

const cart = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CART':
            if (action.payload === "Selesai") {
                return {
                    ...state,
                    cart: [],
                    total: 0
                }
            } else {
                state.cart.push(action.payload)
                let existedCartData = state.cart.find(product => product.id === action.payload.id)
                let idDuplicate = state.cart.map(item => item.id)
                let filtered = state.cart.filter((item, index) => !idDuplicate.includes(item.id, index + 1))
                console.log(filtered, 'inifiltered')
                let filterCartId = filtered.map(cart => {
                    return cart.price * cart.qty
                })
                console.log(existedCartData, 'iniredux')

                // @ts-ignore
                const NumberData = filterCartId.map(item => parseInt(item))
                var total = 0;

                for (var i = 0; i < NumberData.length; ++i) {
                    total += NumberData[i];
                }
                let price = action.payload.price * action.payload.qty
                if (existedCartData) {
                    return {
                        ...state,
                        cart: filtered,
                        total: total
                    }
                }
                else {
                    let newTotal = state.total + action.payload.price
                    action.payload.qty = 1
                    return {
                        ...state,
                        // cart: [...state.cart, push],
                        cart: filtered,
                        total: total
                    }
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