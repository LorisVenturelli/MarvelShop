import * as React from 'react'
import Product from './Product'
import { ProductModel } from '../constants/InterfaceTypes'

interface ProductListProps {
  products: ProductModel[]
}

export default class ProductList extends React.Component<
  ProductListProps,
  any
> {
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.props.products.map((product) => (
            <div key={product.id} className="col-md-3 col-sm-4">
              <Product product={product} />
            </div>
          ))}
        </div>
      </div>
    )
  }
}
