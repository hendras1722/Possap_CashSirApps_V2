import { combineReducers } from 'redux';

import products from './Product';
import categorys from './Category'
import users from './user'

export default combineReducers({
    products,
    categorys,
    users
});