import * as React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import ButtonAddToCart from '../components/ButtonAddToCart'
import { AjaxState, ProductModel } from '../constants/InterfaceTypes'
import Jumbotron from '../components/Jumbotron'
import { API } from '../api'
import AlertLoading from '../components/AlertLoading'
import AlertError from '../components/AlertError'

interface DetailProps {
  match: any
  products: ProductModel[]
}

interface DetailState extends AjaxState {
  productId: number
  product: ProductModel | null
  quantity: number
}

class DetailContainer extends React.Component<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props)

    this.state = {
      productId: parseInt(this.props.match.params.id, 10),
      product: null,
      quantity: 1,
      isLoaded: false,
      error: false,
    }

    this.handlerQuantityChange = this.handlerQuantityChange.bind(this)
    this.onProductAdded = this.onProductAdded.bind(this)
  }

  componentWillMount() {
    API.getProductDetail(this.state.productId)
      .then((product: ProductModel) => {
        this.setState({
          product,
          isLoaded: true,
        })
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoaded: true,
        })
      })
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
    const { isLoaded, error, product } = this.state

    if (!isLoaded) {
      return (
        <div className="container mt-5">
          <AlertLoading />
        </div>
      )
    } else if (!product || error) {
      return (
        <div className="container mt-5">
          <AlertError />
        </div>
      )
    }

    return (
      <div>
        <Jumbotron>
          <h1 className="jumbotron-heading">{product.title}</h1>
        </Jumbotron>

        <div className="container app-content">
          <div className="card">
            <div className="row">
              <aside className="col-sm-4">
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

              <aside className="col-sm-8">
                <article className="card-body">
                  <p className="price-detail-wrap">
                    <span className="price h3 text-warning">
                      <span className="currency">
                        {product.prices[0].price === 0.0
                          ? 'Gratuit'
                          : `${product.prices[0].price} €`}
                      </span>
                    </span>
                  </p>

                  <hr />

                  <dl className="item-property">
                    <dt>Description</dt>
                    <dd>
                      <p>
                        {product.description
                          ? product.description
                          : 'Non disponible'}
                      </p>
                    </dd>
                  </dl>

                  <dl className="param param-feature">
                    <dt>Format</dt>
                    <dd>{product.format}</dd>
                  </dl>

                  <dl className="param param-feature">
                    <dt>Date de publication</dt>
                    <dd>{new Date(product.dates[0].date).toLocaleString()}</dd>
                  </dl>

                  <hr />

                  <dl className="param param-inline">
                    <dt>Quantité:</dt>
                    <dd>
                      <select
                        className="form-control form-control-sm w-25"
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
                    product={product}
                    quantity={this.state.quantity}
                    onProductAdded={() => this.onProductAdded}
                  />
                </article>
              </aside>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {}
}

export default withRouter(
  // Ignore TS error ... bad packages compatibility ?
  // @ts-ignore
  connect(
    mapStateToProps,
    {}
  )(DetailContainer)
)
