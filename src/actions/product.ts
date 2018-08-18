import api from '../api'
import { AnyAction, Dispatch } from 'redux'
import {
  RECEIVE_PRODUCT,
  RECEIVE_PRODUCTS_LIST,
} from '../constants/ActionTypes'
import { SeriesModel } from '../constants/InterfaceTypes'

export const getAllProducts = () => (dispatch: Dispatch<AnyAction>): void => {
  api.getProducts((products: SeriesModel[]) => {
    dispatch({
      type: RECEIVE_PRODUCTS_LIST,
      payload: products,
    })
  })
}

export const getProductDetail = (id: number) => (
  dispatch: Dispatch<AnyAction>
): void => {
  api.getProductDetail(id).then((product) => {
    dispatch({
      type: RECEIVE_PRODUCT,
      payload: product,
    })
  })
}
