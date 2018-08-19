import * as React from 'react'
import { connect } from 'react-redux'
import Jumbotron from '../components/Jumbotron'
import ProductList from '../components/ProductList'
import { ProductModel } from '../constants/InterfaceTypes'
import { Alert } from 'reactstrap'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { search } from '../actions/search'

interface SearchProps {
  match: any
  search: any
  products: ProductModel[]
}

interface SearchState {
  query: string
  isLoaded: boolean
  products: ProductModel[]
  error: boolean
}

class SearchContainer extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props)

    this.state = {
      query: this.props.match.params.query,
      isLoaded: false,
      products: [],
      error: false,
    }
  }

  componentWillMount() {
    this.doSearch()
  }

  componentWillReceiveProps() {
    if (this.state.query !== this.props.match.params.query) {
      this.setState({
        query: this.props.match.params.query,
      })
      this.doSearch()
    } else {
      this.setState({
        isLoaded: true,
        error: false,
        products: this.props.products,
      })
    }
  }

  private doSearch() {
    this.setState({
      isLoaded: false,
      error: false,
    })

    this.props.search(this.state.query)
  }

  render() {
    const { products, isLoaded, error } = this.state

    return (
      <div>
        <Jumbotron>
          <h1 className="jumbotron-heading">Rechercher</h1>
          <div className="lead text-muted m-0">
            {this.props.match.params.query}
          </div>
        </Jumbotron>

        <div className="container">
          {!isLoaded ? (
            <Alert color="info" className="text-center">
              <FontAwesomeIcon icon={faSpinner} spin={true} />
              &nbsp; Recherche en cours ...
            </Alert>
          ) : error ? (
            <Alert color="danger" className="text-center">
              Une erreur est survenue :(
            </Alert>
          ) : products.length === 0 ? (
            <Alert color="info" className="text-center">
              Aucun résultat
            </Alert>
          ) : (
            <ProductList products={products} />
          )}
        </div>
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
  // @ts-ignore
  connect(
    mapStateToProps,
    {
      search,
    }
  )(SearchContainer)
)
