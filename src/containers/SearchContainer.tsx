import * as React from 'react'
import { connect } from 'react-redux'
import Jumbotron from '../components/Jumbotron'
import ProductList from '../components/ProductList'
import {
  AjaxState,
  ApiResponse,
  PaginationState,
  ProductModel,
} from '../constants/InterfaceTypes'
import { Alert, Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import { withRouter } from 'react-router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronLeft,
  faChevronRight,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import { API } from '../api'
import { Link } from 'react-router-dom'
import AlertSearchProgress from '../components/AlertSearchProgress'
import AlertError from '../components/AlertError'
import AlertNoResult from '../components/AlertNoResult'

interface SearchProps {
  match: any
  search: any
  products: ProductModel[]
}

interface SearchState extends AjaxState {
  query: string
  products: ProductModel[]
  pagination: PaginationState
}

class SearchContainer extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props)

    this.state = {
      query: this.getQuery(),
      isLoaded: false,
      products: [],
      error: false,
      pagination: {
        total: 0,
        page: this.getPage(),
        limit: 30,
      },
    }

    this.getQuery = this.getQuery.bind(this)
    this.getPage = this.getPage.bind(this)
    this.getMaxPage = this.getMaxPage.bind(this)
    this.getPagination = this.getPagination.bind(this)
  }

  componentWillMount() {
    this.doSearch()
  }

  componentWillReceiveProps(newProps: any) {
    // Force new props params because this function is executed before the props was updated with new values
    this.props.match.params.query = newProps.match.params.query
    this.props.match.params.page = newProps.match.params.page
    this.doSearch()
  }

  private doSearch() {
    this.setState({
      isLoaded: false,
      error: false,
    })

    API.search(this.getQuery(), this.state.pagination.limit, this.getPage())
      .then((response: ApiResponse) => {
        this.setState({
          products: response.results,
          isLoaded: true,
          pagination: Object.assign(this.state.pagination, {
            total: response.total,
          }),
        })
      })
      .catch(() => {
        this.setState({
          error: true,
          isLoaded: true,
        })
      })
  }

  private getQuery(): string {
    return this.props.match.params.query || null
  }

  private getPage(): number {
    if (this.props.match.params.page) {
      return parseInt(this.props.match.params.page, 10)
    }

    return 1
  }
  private getMaxPage(): number {
    return Math.ceil(this.state.pagination.total / this.state.pagination.limit)
  }

  private getPagination() {
    const maxPage = this.getMaxPage()
    const pageNumbers = []

    for (let i = 1; i <= maxPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers.map((number) => {
      return (
        <PaginationItem key={number} active={this.getPage() === number}>
          <Link
            to={`/search/${this.getQuery()}/${number}`}
            className="page-link">
            {number}
          </Link>
        </PaginationItem>
      )
    })
  }

  render() {
    const { products, isLoaded, error } = this.state

    return (
      <div>
        <Jumbotron>
          <h1 className="jumbotron-heading">Rechercher</h1>
          <div className="lead text-muted m-0">{this.getQuery()}</div>
        </Jumbotron>

        <div className="container app-content">
          {!isLoaded ? (
            <AlertSearchProgress />
          ) : error ? (
            <AlertError />
          ) : products.length === 0 ? (
            <AlertNoResult />
          ) : (
            <div>
              <ProductList products={products} />

              <Pagination
                listClassName="justify-content-center"
                className="m-5">
                <PaginationItem disabled={this.getPage() === 1}>
                  <Link
                    to={
                      this.getPage() > 1
                        ? `/search/${this.getQuery()}/${this.getPage() - 1}`
                        : ''
                    }
                    className="page-link">
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </Link>
                </PaginationItem>
                {this.getPagination()}
                <PaginationItem disabled={this.getPage() === this.getMaxPage()}>
                  <Link
                    to={
                      this.getPage() < this.getMaxPage()
                        ? `/search/${this.getQuery()}/${this.getPage() + 1}`
                        : ''
                    }
                    className="page-link">
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                </PaginationItem>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {}
}

export default withRouter(
  // Ignore TS error ... bad packages compatibility ?
  // @ts-ignore
  connect(
    mapStateToProps,
    {}
  )(SearchContainer)
)
