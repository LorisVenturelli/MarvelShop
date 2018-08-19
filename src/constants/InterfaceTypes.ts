import { Action } from 'redux'

export interface ProductModel {
  id: number
  title: string
  thumbnail: SeriesThumbnail
  price: number
  startYear: string
  modified: Date
  description: string
}

export interface ProductCartModel extends ProductModel {
  quantity: number
}

export interface SeriesThumbnail {
  extension: string
  path: string
}

export interface ProductAction extends Action {
  payload: ProductPayloadAction
}

export interface ProductPayloadAction {
  product: ProductModel
  products: ProductModel[]
}

export interface PricesState {
  productId: number
  price: number
}

export interface ProductsReducer {
  pricesList: PricesState[]
  list: ProductModel[]
}

export interface CartAction extends Action {
  payload: CartPayloadAction
}

export interface CartPayloadAction {
  product: ProductCartModel
  quantity: number
}
