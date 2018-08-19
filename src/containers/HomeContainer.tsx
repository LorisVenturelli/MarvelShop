import * as React from 'react'

import Jumbotron from '../components/Jumbotron'
import ProductList from '../components/ProductList'
import { API } from '../api'
import { AjaxState, ProductModel } from '../constants/InterfaceTypes'
import { Alert } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import AlertError from '../components/AlertError'
import AlertNoResult from '../components/AlertNoResult'
import AlertSearchProgress from '../components/AlertSearchProgress'
import AlertLoading from '../components/AlertLoading'

interface HomeState extends AjaxState {
  products: ProductModel[]
}

export default class HomeContainer extends React.Component<any, HomeState> {
  constructor(props: any) {
    super(props)

    this.state = {
      products: [],
      isLoaded: false,
      error: false,
    }
  }

  componentWillMount() {
    API.getLastProducts()
      .then((products: ProductModel[]) => {
        this.setState({
          products,
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

  render() {
    const { products, error, isLoaded } = this.state

    return (
      <div>
        <Jumbotron>
          <h1 className="jumbotron-heading">Marvel Shop</h1>
          <p className="lead text-muted m-0">
            Bienvenue dans le monde animé des Marvels !
          </p>
        </Jumbotron>
        <section className="container app-content">
          <h4 className="text-center mb-5">Derniers produits</h4>
          {!isLoaded ? (
            <AlertLoading />
          ) : error ? (
            <AlertError />
          ) : products.length === 0 ? (
            <AlertNoResult />
          ) : (
            <ProductList products={products} />
          )}
        </section>
      </div>
    )
  }
}
