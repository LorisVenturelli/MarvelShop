import * as React from 'react'
import { ProductModel } from '../constants/InterfaceTypes'
import ButtonAddToCart from './ButtonAddToCart'
import { Link } from 'react-router-dom'

interface ProductProps {
  product: ProductModel
}

export default class Product extends React.Component<ProductProps, any> {
  render() {
    const { product } = this.props

    return (
      <div className="card card-product mb-3 bg-light">
        <img
          className="card-img-top bg-light"
          src={product.thumbnail.path + '.' + product.thumbnail.extension}
          alt={product.title}
        />
        <div className="card-body text-center">
          <h5 className="card-title">
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </h5>
          {product.price && <h6>{product.price.toFixed(2)} €</h6>}
          <ButtonAddToCart product={product} />
        </div>
      </div>
    )
  }
}
