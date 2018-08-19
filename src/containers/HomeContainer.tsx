import * as React from 'react'
import { connect } from 'react-redux'
import { getAllProducts } from '../actions/product'
import { withRouter } from 'react-router'

import Jumbotron from '../components/Jumbotron'
import ProductList from '../components/ProductList'

class HomeContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props)

    this.props.getAllProducts()
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="jumbotron-heading">Marvel Shop</h1>
          <p className="lead text-muted m-0">
            Bienvenue dans le monde animé des Marvels !
          </p>
        </Jumbotron>
        <ProductList products={this.props.products} />
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    products: state.products.list,
  }
}

export default withRouter(
  // Ignore TS error ... bad packages compatibility ?
  // @ts-ignore
  connect(
    mapStateToProps,
    {
      getAllProducts,
    }
  )(HomeContainer)
)
