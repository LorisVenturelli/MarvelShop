import * as React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap'
import { SeriesCartModel } from '../constants/InterfaceTypes'

interface HeaderProps {
  cart: SeriesCartModel[]
}

interface HeaderState {
  isOpen: boolean
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <header>
        <Navbar color="dark" dark={true} expand="md">
          <NavbarBrand href="/">
            Marvel Shop
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar={true}>
            <Nav className="mr-auto" navbar={true}>
              <NavItem>
                <NavLink to="/" className="nav-link" exact={true}>
                  Accueil
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/cart" className="nav-link" exact={true}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                  &nbsp; Panier ({this.props.cart.length})
                </NavLink>
              </NavItem>
            </Nav>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Rechercher"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
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
