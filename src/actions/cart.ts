import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_ITEM_UNITS,
} from '../constants/ActionTypes'
import { SeriesModel } from '../constants/InterfaceTypes'

export function addToCart(product: SeriesModel, quantity = 1) {
  return {
    type: ADD_TO_CART,
    payload: { product, quantity },
  }
}

export function updateItemUnits(product: SeriesModel, units: number) {
  return {
    type: UPDATE_ITEM_UNITS,
    payload: { product, units },
  }
}

export function deleteFromCart(product: SeriesModel) {
  return {
    type: DELETE_FROM_CART,
    payload: { product },
  }
}
