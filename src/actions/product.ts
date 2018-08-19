import { API } from '../api'
import { AnyAction, Dispatch } from 'redux'
import {
  RECEIVE_PRODUCT,
  RECEIVE_PRODUCTS_LIST,
} from '../constants/ActionTypes'
import { ProductModel } from '../constants/InterfaceTypes'

export const getAllProducts = () => (dispatch: Dispatch<AnyAction>): void => {
  API.getProducts((products: ProductModel[]) => {
    dispatch({
      type: RECEIVE_PRODUCTS_LIST,
      payload: { products },
    })
  })
}

export const getProductDetail = (id: number) => (
  dispatch: Dispatch<AnyAction>
): void => {
  API.getProductDetail(id).then((product) => {
    dispatch({
      type: RECEIVE_PRODUCT,
      payload: { product },
    })
  })
}
