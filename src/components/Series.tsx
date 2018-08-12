import * as React from 'react'
import { SeriesModel } from '../constants/InterfaceTypes'
import ButtonAddToCart from './ButtonAddToCart'

interface AlbumItemProps {
  item: SeriesModel
}

export default class Series extends React.Component<AlbumItemProps, any> {
  render() {
    const { item } = this.props

    return (
      <div className="card mb-3">
        <img
          className="card-img-top"
          src={item.thumbnail.path + '.' + item.thumbnail.extension}
          alt="Card image cap"
        />
        <div className="card-body text-center">
          <h5 className="card-title">{item.title}</h5>
          <ButtonAddToCart item={item} />
        </div>
      </div>
    )
  }
}
