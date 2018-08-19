import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_ITEM_UNITS,
} from '../constants/ActionTypes'
import { ProductModel } from '../constants/InterfaceTypes'

export function addToCart(product: ProductModel, quantity = 1) {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity },
  }
}

export function updateItemUnits(product: ProductModel, quantity: number) {
  return {
    type: UPDATE_ITEM_UNITS,
    payload: { product, quantity },
  }
}

export function deleteFromCart(product: ProductModel) {
  return {
    type: DELETE_FROM_CART,
    payload: { product },
  }
}
