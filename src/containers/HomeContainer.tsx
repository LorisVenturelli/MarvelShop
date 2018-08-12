import * as React from 'react'
import Jumbotron from '../components/Jumbotron'
import SeriesList from '../components/SeriesList'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class HomeContainer extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Jumbotron />
        <SeriesList products={this.props.products} />
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    products: state.products,
  }
}
function mapActionsToProps(dispatch: any) {
  return bindActionCreators({}, dispatch)
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(HomeContainer)
