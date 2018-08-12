import { Action } from 'redux'

export interface SeriesModel {
  id: number
  title: string
  thumbnail: SeriesThumbnail
}

export interface SeriesCartModel extends SeriesModel {
  units: number
}

export interface SeriesThumbnail {
  extension: string
  path: string
}

export interface AppAction extends Action {
  payload: any
}
