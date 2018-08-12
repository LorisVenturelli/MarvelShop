import {
  AppAction,
  SeriesCartModel,
  SeriesModel,
} from '../constants/InterfaceTypes'
import {
  ADD_ITEM_UNITS,
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_ITEM_UNITS,
} from '../constants/ActionTypes'

const initialState: SeriesCartModel[] = []

export default function cartReducer<Reducer>(
  state = initialState,
  action: AppAction
) {
  switch (action.type) {
    case ADD_TO_CART:
      const existingIndex = findProductIndex(state, action.payload.id)
      if (existingIndex === -1) {
        action.payload.units = 1
        return state.concat(action.payload)
      }
      state[existingIndex].units += 1
      return state.concat([])

    case ADD_ITEM_UNITS:
      const index = findProductIndex(state, action.payload.id)
      state[index].units = state[index].units + 1
      return state.concat([])

    case UPDATE_ITEM_UNITS:
      const existingItemIndex = findProductIndex(
        state,
        action.payload.product.id
      )
      if (state[existingItemIndex].units === 1 && action.payload.units === -1) {
        break
      }
      state[existingItemIndex].units += action.payload.units
      return state.concat([])

    case DELETE_FROM_CART:
      const indexToDel = findProductIndex(state, action.payload.id)
      return [...state.slice(0, indexToDel), ...state.slice(indexToDel + 1)]
  }

  function findProductIndex(products: SeriesModel[], id: number) {
    return products.findIndex((p: SeriesModel) => p.id === id)
  }

  return state
}
