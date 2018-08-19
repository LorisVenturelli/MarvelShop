import { AppAction, ProductModel } from '../constants/InterfaceTypes'
import {
  RECEIVE_PRODUCT,
  RECEIVE_PRODUCTS_LIST,
} from '../constants/ActionTypes'

interface PricesState {
  productId: number
  price: number
}

interface ProductsReducer {
  pricesList: PricesState[]
  list: ProductModel[]
}

const initialState: ProductsReducer = {
  pricesList: [],
  list: [],
}

export default function productsReducer<Reducer>(
  state = initialState,
  action: AppAction
) {
  switch (action.type) {
    case RECEIVE_PRODUCT:
      parsePriceOnProduct(state, action.payload.product)
      state.list = [action.payload.product]
      return Object.assign({}, state)

    case RECEIVE_PRODUCTS_LIST:
      action.payload.products.forEach((product: ProductModel) =>
        parsePriceOnProduct(state, product)
      )
      state.list = action.payload.products
      return Object.assign({}, state)
  }

  return state
}

function parsePriceOnProduct(state: any, product: ProductModel) {
  let priceProduct = state.pricesList.find((price: PricesState) => {
    return price.productId === product.id
  })
  if (!priceProduct) {
    priceProduct = {
      productId: product.id,
      price: Math.floor(Math.random() * 30) + 10,
    }
    state.pricesList.push(priceProduct)
  }
  product.price = priceProduct.price
}
