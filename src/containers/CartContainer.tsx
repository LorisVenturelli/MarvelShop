import * as React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link, withRouter } from 'react-router-dom'
import { ProductCartModel } from '../constants/InterfaceTypes'
import CartProduct from '../components/CartProduct'
import { deleteFromCart, updateItemUnits } from '../actions/cart'

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

  private getTotal(): number {
    let total = 0

    this.props.cart.forEach((product) => {
      total += product.price * product.quantity
    })

    return total
  }

  render() {
    return (
      <div id="shopping-cart" className="container">
        <div className="card">
          <div className="card-header bg-dark text-light">
            <FontAwesomeIcon icon={faShoppingCart} />
            &nbsp; Mon panier
            <Link to="/" className="btn btn-outline-primary btn-sm float-right">
              Continuer mon shopping
            </Link>
          </div>
          <div className="card-body">
            {this.props.cart.length === 0 ? (
              <p className="text-center">Votre panier est vide</p>
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
                Total : <b>{this.getTotal().toFixed(2)} €</b>
              </span>
            </div>
          )}
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
