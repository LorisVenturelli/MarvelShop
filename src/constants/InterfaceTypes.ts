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

export interface AppAction extends Action {
  payload: any
}
