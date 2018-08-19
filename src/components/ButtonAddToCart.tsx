import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { Link } from 'react-router-dom'
import { ProductModel } from '../constants/InterfaceTypes'
import { connect } from 'react-redux'
import { addToCart } from '../actions/cart'

interface ButtonAddToCartProps {
  product: ProductModel
  quantity?: number
  addToCart?: any
  onProductAdded?: any
}

interface ButtonAddToCartState {
  modal: boolean
}

class ButtonAddToCart extends React.Component<
  ButtonAddToCartProps,
  ButtonAddToCartState
> {
  constructor(props: ButtonAddToCartProps) {
    super(props)
    this.state = {
      modal: false,
    }

    this.addToCart = this.addToCart.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  addToCart() {
    this.props.addToCart(this.props.product, this.props.quantity)
    this.toggle()

    if (this.props.onProductAdded) {
      this.props.onProductAdded()
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    return (
      <span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.addToCart}>
          <FontAwesomeIcon icon={faPlusCircle} />
          &nbsp; Ajouter au panier
        </button>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Article ajouté au panier
          </ModalHeader>
          <ModalBody className="text-center">
            <FontAwesomeIcon icon={faCheck} size="lg" />
            <p>Votre article a bien été rajouté dans votre panier !</p>
          </ModalBody>
          <ModalFooter>
            <Link to="/cart" className="btn btn-secondary">
              Voir mon panier
            </Link>{' '}
            <Button color="primary" onClick={this.toggle}>
              Continuer mon shopping
            </Button>
          </ModalFooter>
        </Modal>
      </span>
    )
  }
}

export default connect(
  null,
  { addToCart }
)(ButtonAddToCart)
