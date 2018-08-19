import { Action } from 'redux'

export interface ProductModel {
  id: number
  title: string
  thumbnail: ProductThumbnail
  prices: ProductPrices[]
  startYear: string
  description: string
}

export interface ProductCartModel extends ProductModel {
  quantity: number
}

export interface ProductThumbnail {
  extension: string
  path: string
}

export interface ProductPrices {
  type: string
  price: number
}

export interface CartAction extends Action {
  payload: CartPayloadAction
}

export interface CartPayloadAction {
  product: ProductCartModel
  quantity: number
}

export interface AjaxState {
  isLoaded: boolean
  error: boolean
}

export interface ApiResponse {
  total: number
  results: ProductModel[]
}

export interface PaginationState {
  total: number
  page: number
  limit: number
}
