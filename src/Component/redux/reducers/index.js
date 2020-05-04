import { combineReducers } from 'redux';

import products from './Product';
import categorys from './Category'
import users from './user'
import cart from './carts'
import order from './order'
import logins from './auth'

export default combineReducers({
    products,
    categorys,
    users,
    cart,
    order,
    logins
});