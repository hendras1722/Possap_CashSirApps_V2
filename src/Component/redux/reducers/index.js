import { combineReducers } from 'redux';

import products from './Product';
import categorys from './Category'
import users from './user'
import cart from './carts'

export default combineReducers({
    products,
    categorys,
    users,
    cart
});