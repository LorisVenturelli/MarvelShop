import * as React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from 'react-router-dom'
import { ProductCartModel } from '../constants/InterfaceTypes'
import CartProduct from '../components/CartProduct'
import { deleteFromCart, updateItemUnits } from '../actions/cart'
import Jumbotron from '../components/Jumbotron'

interface CartProps {
  cart: ProductCartModel[]
  deleteFromCart: any
  updateItemUnits: any
}

class CartContainer extends React.Component<CartProps, any> {
  handleDeleteFromCart(product: ProductCartModel) {
    this.props.deleteFromCart(product)
  }

  handleDeductUnit(product: ProductCartModel) {
    const quantity = -1
    this.props.updateItemUnits(product, quantity)
  }

  handleAddUnit(product: ProductCartModel) {
    const quantity = 1
    this.props.updateItemUnits(product, quantity)
  }

  private getTotalPrice(): number {
    let total = 0

    this.props.cart.forEach((product) => {
      total += product.prices[0].price * product.quantity
    })

    return total
  }

  private getTotalQuantity(): number {
    let total = 0

    this.props.cart.forEach((product) => {
      total += product.quantity
    })

    return total
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="jumbotron-heading">Mon panier</h1>
        </Jumbotron>
        <div id="shopping-cart" className="container app-content">
          <div className="card">
            <div className="card-header bg-dark text-light">
              {this.getTotalQuantity() > 0 && (
                <span>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  &nbsp; {this.getTotalQuantity()} article
                  {this.getTotalQuantity() > 1 && 's'}
                </span>
              )}
              <Link
                to="/"
                className="btn btn-outline-primary btn-sm float-right">
                Continuer mon shopping
              </Link>
            </div>
            <div className="card-body">
              {this.props.cart.length === 0 ? (
                <p className="text-center">Aucun article</p>
              ) : (
                this.props.cart.map((product) => (
                  <CartProduct
                    key={product.id}
                    product={product}
                    onAddUnit={this.handleAddUnit.bind(this, product)}
                    onDeductUnit={this.handleDeductUnit.bind(this, product)}
                    handleDeleteFromCart={this.handleDeleteFromCart.bind(
                      this,
                      product
                    )}
                  />
                ))
              )}
            </div>
            {this.props.cart.length > 0 && (
              <div className="card-footer text-right">
                <span>
                  Total : <b>{this.getTotalPrice().toFixed(2)} €</b>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    cart: state.cart,
  }
}

export default withRouter(
  // Ignore TS error ... bad packages compatibility ?
  // @ts-ignore
  connect(
    mapStateToProps,
    {
      deleteFromCart,
      updateItemUnits,
    }
  )(CartContainer)
)
