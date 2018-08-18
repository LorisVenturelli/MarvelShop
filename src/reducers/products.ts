import { AppAction, SeriesModel } from '../constants/InterfaceTypes'
import {
  RECEIVE_PRODUCT,
  RECEIVE_PRODUCTS_LIST,
} from '../constants/ActionTypes'

interface PricesState {
  productId: number
  price: number
}
const pricesList: PricesState[] = []

const initialState: SeriesModel[] = []

export default function productsReducer<Reducer>(
  state = initialState,
  action: AppAction
) {
  switch (action.type) {
    case RECEIVE_PRODUCT:
      parsePriceOnProduct(action.payload)
      const founded = state.find(
        (productState) => productState.id === action.payload.id
      )
      if (!founded) {
        return state.concat(action.payload)
      }
      return state.concat([])

    case RECEIVE_PRODUCTS_LIST:
      action.payload.forEach(parsePriceOnProduct)
      const onlyNewProducts = action.payload.filter((product: SeriesModel) => {
        return !state.find((productState) => productState.id === product.id)
      })
      return state.concat(onlyNewProducts)
  }

  return state
}

function parsePriceOnProduct(product: SeriesModel) {
  let priceProduct = pricesList.find((item) => {
    return item.productId === product.id
  })
  if (!priceProduct) {
    priceProduct = {
      productId: product.id,
      price: Math.floor(Math.random() * 30),
    }
    pricesList.concat(priceProduct)
  }
  product.price = priceProduct.price
}
