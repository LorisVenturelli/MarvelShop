import { AppAction, SeriesModel } from '../constants/InterfaceTypes'
import { RECEIVE_PRODUCTS } from '../constants/ActionTypes'

const initialState: SeriesModel[] = []

export default function productsReducer<Reducer>(
  state = initialState,
  action: AppAction
) {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
      return state.concat(action.payload)
  }

  return state
}
