import * as React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrash } from '@fortawesome/free-solid-svg-icons'
import '../components/Cart/Cart.scss'
import { Link } from 'react-router-dom'
import { SeriesCartModel } from '../constants/InterfaceTypes'
import CartItem from '../components/Cart/CartItem'
import { deleteFromCart, updateItemUnits } from '../actions/cart'

interface CartProps {
  cart: SeriesCartModel[]
  deleteFromCart: any
  updateItemUnits: any
}

class CartContainer extends React.Component<CartProps, any> {
  handleDeleteFromCart(product: SeriesCartModel) {
    this.props.deleteFromCart(product)
  }

  handleDeductUnit(product: SeriesCartModel) {
    const units = -1
    this.props.updateItemUnits(product, units)
  }

  handleAddUnit(product: SeriesCartModel) {
    const units = 1
    this.props.updateItemUnits(product, units)
  }

  render() {
    return (
      <div id="shopping-cart" className="container">
        <div className="card">
          <div className="card-header bg-dark text-light">
            <FontAwesomeIcon icon={faShoppingCart} />
            &nbsp; Votre panier
            <Link to="/" className="btn btn-outline-info btn-sm float-right">
              Continuer votre shopping
            </Link>
          </div>
          <div className="card-body">
            {this.props.cart.map(product => (
              <CartItem
                key={product.id}
                item={product}
                onAddUnit={this.handleAddUnit.bind(this, product)}
                onDeductUnit={this.handleDeductUnit.bind(this, product)}
                handleDeleteFromCart={this.handleDeleteFromCart.bind(
                  this,
                  product
                )}
              />
            ))}

            <hr />
          </div>
          <div className="card-footer text-right">
            <span>
              Total price: <b>50.00€</b>
            </span>
            <a href="" className="btn btn-success">
              Checkout
            </a>
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

export default connect(
  mapStateToProps,
  {
    deleteFromCart,
    updateItemUnits,
  }
)(CartContainer)
