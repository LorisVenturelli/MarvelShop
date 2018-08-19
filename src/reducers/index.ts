import { combineReducers } from 'redux'
import cart from './cart'
import products from './products'

// @ts-ignore
export default combineReducers({
  cart,
  products,
})
