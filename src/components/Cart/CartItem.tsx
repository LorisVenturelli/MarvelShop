import * as React from 'react'
import { SeriesCartModel } from '../../constants/InterfaceTypes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

interface CartItemProps {
  item: SeriesCartModel
  onAddUnit: any
  onDeductUnit: any
  handleDeleteFromCart: any
}

interface CartItemState {
  modal: boolean
}

export default class CartItem extends React.Component<
  CartItemProps,
  CartItemState
> {
  constructor(props: CartItemProps) {
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
    const { item, onAddUnit, onDeductUnit, handleDeleteFromCart } = this.props

    return (
      <div className="row">
        <div className="col-12 col-sm-12 col-md-2 text-center">
          <img
            className="img-responsive"
            src={item.thumbnail.path + '.' + item.thumbnail.extension}
            alt="prewiew"
            width="120"
            height="80"
          />
        </div>
        <div className="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
          <h4 className="item-name">
            <strong>{item.title}</strong>
          </h4>
          <h4>
            <small>Quantité : {item.units}</small>
          </h4>
        </div>
        <div className="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
          <div className="col-3 col-sm-3 col-md-6 text-md-right">
            <h6>
              <strong>
                25.00 <span className="text-muted">x</span>
              </strong>
            </h6>
          </div>
          <div className="col-4 col-sm-4 col-md-4">
            <div className="quantity">
              <button
                type="button"
                className="plus"
                onClick={() => onAddUnit()}
              >
                +
              </button>
              <input
                type="number"
                step="1"
                max="99"
                min="1"
                value={item.units.toString()}
                className="qty"
                readOnly={true}
              />
              <button
                type="button"
                className="minus"
                onClick={() => onDeductUnit()}
              >
                -
              </button>
            </div>
          </div>
          <div className="col-2 col-sm-2 col-md-2 text-right">
            <button
              type="button"
              className="btn btn-outline-danger btn-xs"
              onClick={() => this.toggle()}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>

            <Modal isOpen={this.state.modal} toggle={this.toggle} className="">
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
        </div>
      </div>
    )
  }
}
