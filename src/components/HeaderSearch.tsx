import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { withRouter } from 'react-router'

interface HeaderSearchProps {}

interface HeaderSearchState {
  query: string
}

class HeaderSearch extends React.Component<
  HeaderSearchProps,
  HeaderSearchState
> {
  constructor(props: HeaderSearchProps) {
    super(props)

    this.state = {
      query: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handlerSubmit = this.handlerSubmit.bind(this)
  }

  private handleChange(e: any) {
    this.setState({
      query: e.target.value,
    })
  }

  private handlerSubmit(e: any) {
    e.preventDefault()

    // @ts-ignore
    this.props.history.push(`/search/${this.state.query}`)
  }

  render() {
    const { query } = this.state

    return (
      <form className="form-inline my-2 my-lg-0" onSubmit={this.handlerSubmit}>
        <div className="input-group">
          <input
            className="form-control"
            type="search"
            placeholder="Rechercher"
            name="query"
            value={query}
            onChange={this.handleChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </form>
    )
  }
}

// @ts-ignore
export default withRouter(HeaderSearch)
