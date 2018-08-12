import api from '../api'
import { AnyAction, Dispatch } from 'redux'
import { RECEIVE_PRODUCTS } from '../constants/ActionTypes'
import { SeriesModel } from '../constants/InterfaceTypes'

export const getAllProducts = () => (dispatch: Dispatch<AnyAction>): void => {
  api.getProducts((products: SeriesModel[]) => {
    dispatch({
      type: RECEIVE_PRODUCTS,
      payload: products,
    })
  })
}
