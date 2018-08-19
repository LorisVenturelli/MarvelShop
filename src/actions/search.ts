import { API } from '../api'
import { AnyAction, Dispatch } from 'redux'
import {
  RECEIVE_PRODUCT,
  RECEIVE_PRODUCTS_LIST,
} from '../constants/ActionTypes'
import { ProductModel } from '../constants/InterfaceTypes'

export const search = (query: string, limit = 20, offset = 0) => (
  dispatch: Dispatch<AnyAction>
): void => {
  API.search(query, limit, offset).then((products: ProductModel[]) => {
    dispatch({
      type: RECEIVE_PRODUCTS_LIST,
      payload: products,
    })
  })
}
