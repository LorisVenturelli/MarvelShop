import * as React from 'react'
import { SeriesModel } from '../constants/InterfaceTypes'
import ButtonAddToCart from './ButtonAddToCart'
import { Link } from 'react-router-dom'

interface AlbumItemProps {
  item: SeriesModel
}

export default class Series extends React.Component<AlbumItemProps, any> {
  render() {
    const { item } = this.props

    return (
      <div className="card mb-3">
        <img
          className="card-img-top img-thumbnail"
          src={item.thumbnail.path + '.' + item.thumbnail.extension}
          alt="Card image cap"
        />
        <div className="card-body text-center">
          <h5 className="card-title">
            <Link to={`/product/${item.id}`}>{item.title}</Link>
          </h5>
          <h6>{item.price.toFixed(2)} €</h6>
          <ButtonAddToCart item={item} />
        </div>
      </div>
    )
  }
}
