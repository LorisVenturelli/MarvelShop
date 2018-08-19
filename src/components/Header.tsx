import * as React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Collapse, Nav, Navbar, NavbarToggler, NavItem } from 'reactstrap'
import { ProductCartModel } from '../constants/InterfaceTypes'
import HeaderSearch from './HeaderSearch'

interface HeaderProps {
  cart: ProductCartModel[]
}

interface HeaderState {
  isOpen: boolean
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props)

    this.state = {
      isOpen: false,
    }

    this.toggle = this.toggle.bind(this)
    this.getTotalQuantity = this.getTotalQuantity.bind(this)
  }

  private toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  private getTotalPrice() {
    let total = 0

    this.props.cart.forEach((product) => {
      total += product.price * product.quantity
    })

    return total
  }

  private getTotalQuantity() {
    let total = 0

    this.props.cart.forEach((product) => {
      total += product.quantity
    })

    return total
  }

  render() {
    return (
      <header>
        <Navbar color="dark" dark={true} expand="md">
          <Link to="/" className="navbar-brand" />
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="mr-auto" navbar={true}>
              <NavItem>
                <NavLink to="/" className="nav-link" exact={true}>
                  Accueil
                </NavLink>
              </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar={true}>
              <NavItem>
                <NavLink to="/cart" className="nav-link" exact={true}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  &nbsp; Panier
                  {this.getTotalQuantity() > 0 && (
                    <span>
                      &nbsp;(
                      {this.getTotalQuantity()} -{' '}
                      {this.getTotalPrice().toFixed(2)} €)
                    </span>
                  )}
                </NavLink>
              </NavItem>
              <NavItem className="ml-2">
                <HeaderSearch />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
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
  {}
)(Header)
