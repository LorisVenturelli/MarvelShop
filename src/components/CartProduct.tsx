import * as React from 'react'
import { ProductCartModel } from '../constants/InterfaceTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

interface CartProductProps {
  product: ProductCartModel
  onAddUnit: any
  onDeductUnit: any
  handleDeleteFromCart: any
}

interface CartProductState {
  modal: boolean
}

export default class CartProduct extends React.Component<
  CartProductProps,
  CartProductState
> {
  constructor(props: CartProductProps) {
    super(props)
    this.state = {
      modal: false,
    }

    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    })
  }

  render() {
    const {
      product,
      onAddUnit,
      onDeductUnit,
      handleDeleteFromCart,
    } = this.props

    return (
      <div className="row">
        <div className="col-12 col-sm-12 col-md-2 text-center">
          <img
            className="img-responsive"
            src={product.thumbnail.path + '.' + product.thumbnail.extension}
            alt="prewiew"
            width="120"
            height="80"
          />
        </div>
        <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
          <h4 className="item-name">
            <strong>{product.title}</strong>
          </h4>
          <small>Format : {product.format}</small>
        </div>
        <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
          <div className="col-3 col-sm-3 col-md-6 text-md-right">
            <strong>
              {product.prices[0].price === 0.0
                ? 'Gratuit'
                : `${product.prices[0].price} €`}
            </strong>
          </div>
          <div className="col-4 col-sm-4 col-md-4">
            <div className="quantity">
              <button
                type="button"
                className="plus"
                onClick={() => onAddUnit()}>
                +
              </button>
              <input
                type="number"
                step="1"
                max="99"
                min="1"
                value={product.quantity.toString()}
                className="qty"
                readOnly={true}
              />
              <button
                type="button"
                className="minus"
                onClick={() => onDeductUnit()}>
                -
              </button>
            </div>
          </div>
          <div className="col-2 col-sm-2 col-md-2 text-right">
            <button
              type="button"
              className="btn btn-outline-danger btn-xs"
              onClick={() => this.toggle()}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>
            Supprimer un article du panier
          </ModalHeader>
          <ModalBody>
            Confirmez-vous la suppression de cette article ?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Anuler
            </Button>{' '}
            <Button color="danger" onClick={() => handleDeleteFromCart()}>
              Supprimer
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}
