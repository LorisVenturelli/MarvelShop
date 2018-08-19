import * as React from 'react'
import { Jumbotron as ReactJumbotron } from 'reactstrap'

export default class Jumbotron extends React.Component {
  render() {
    return (
      <ReactJumbotron>
        <div className="container text-center">{this.props.children}</div>
      </ReactJumbotron>
    )
  }
}
