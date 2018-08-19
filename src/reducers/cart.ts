import {
  CartAction,
  ProductCartModel,
  ProductModel,
} from '../constants/InterfaceTypes'
import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  UPDATE_ITEM_UNITS,
} from '../constants/ActionTypes'

const initialState: ProductCartModel[] = []

export default function cartReducer<Reducer>(
  state = initialState,
  action: CartAction
) {
  switch (action.type) {
    case ADD_TO_CART:
      const existingIndex = findProductIndex(state, action.payload.product.id)
      if (existingIndex === -1) {
        action.payload.product.quantity = action.payload.quantity
        return state.concat(action.payload.product)
      }
      state[existingIndex].quantity += action.payload.quantity
      return state.concat([])

    case UPDATE_ITEM_UNITS:
      const existingItemIndex = findProductIndex(
        state,
        action.payload.product.id
      )
      if (
        state[existingItemIndex].quantity === 1 &&
        action.payload.quantity === -1
      ) {
        break
      }
      state[existingItemIndex].quantity += action.payload.quantity
      return state.concat([])

    case DELETE_FROM_CART:
      const indexToDel = findProductIndex(state, action.payload.product.id)
      return [...state.slice(0, indexToDel), ...state.slice(indexToDel + 1)]
  }

  function findProductIndex(products: ProductModel[], id: number) {
    return products.findIndex((product: ProductModel) => product.id === id)
  }

  return state
}
