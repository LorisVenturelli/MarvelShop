import * as React from 'react'
import { connect } from 'react-redux'
import { Alert } from 'reactstrap'
import ButtonAddToCart from '../components/ButtonAddToCart'
import { SeriesModel } from '../constants/InterfaceTypes'
import { getProductDetail } from '../actions/product'

import './Detail.scss'

interface DetailProps {
  match: any
  products: SeriesModel[]
  getProductDetail: any
}

interface DetailState {
  productId: number
  product: SeriesModel | null
  isLoaded: boolean
  quantity: number
}

class DetailContainer extends React.Component<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props)

    this.state = {
      productId: parseInt(this.props.match.params.id, 10),
      product: null,
      isLoaded: false,
      quantity: 1,
    }

    this.props.getProductDetail(this.props.match.params.id)

    this.handlerQuantityChange = this.handlerQuantityChange.bind(this)
    this.onProductAdded = this.onProductAdded.bind(this)
  }

  componentDidUpdate() {
    if (this.state.product) {
      return
    }

    const product = this.props.products.find(
      (product) => product.id === this.state.productId
    )
    if (product) {
      this.setState({
        product,
        isLoaded: true,
      })
    }
  }

  private handlerQuantityChange(event: any) {
    this.setState({
      quantity: parseInt(event.target.value, 10),
    })
  }

  private onProductAdded() {
    this.setState({
      quantity: 1,
    })
  }

  render() {
    const { isLoaded, product } = this.state

    return (
      <div className="container">
        {!isLoaded ? (
          <Alert color="info">Chargement en cours ...</Alert>
        ) : (
          product && (
            <div className="card">
              <div className="row">
                <aside className="col-sm-5 border-right">
                  <article className="gallery-wrap">
                    <div className="img-big-wrap">
                      <img
                        src={
                          product.thumbnail.path +
                          '.' +
                          product.thumbnail.extension
                        }
                      />
                    </div>
                  </article>
                </aside>

                <aside className="col-sm-7">
                  <article className="card-body p-5">
                    <h3 className="title mb-3">{product.title}</h3>

                    <p className="price-detail-wrap">
                      <span className="price h3 text-warning">
                        <span className="currency">EUR €</span>
                        <span className="num">{product.price.toFixed(2)}</span>
                      </span>
                    </p>
                    {product.description && (
                      <dl className="item-property">
                        <dt>Description</dt>
                        <dd>
                          <p>
                            Here goes description consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua. Ut enim ad minim veniam, quis nostrud
                            exercitation ullamco{' '}
                          </p>
                        </dd>
                      </dl>
                    )}

                    <dl className="param param-feature">
                      <dt>Année</dt>
                      <dd>{product.startYear}</dd>
                    </dl>

                    <hr />

                    <dl className="param param-inline">
                      <dt>Quantité:</dt>
                      <dd>
                        <select
                          className="form-control form-control-sm"
                          onChange={this.handlerQuantityChange}>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </dd>
                    </dl>

                    <hr />

                    <ButtonAddToCart
                      item={product}
                      quantity={this.state.quantity}
                      onProductAdded={() => this.onProductAdded}
                    />
                  </article>
                </aside>
              </div>
            </div>
          )
        )}
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    products: state.products,
  }
}

export default connect(
  mapStateToProps,
  {
    getProductDetail,
  }
)(DetailContainer)
