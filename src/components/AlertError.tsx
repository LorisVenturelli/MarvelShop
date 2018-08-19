import * as React from 'react'
import { Alert } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default class AlertError extends React.Component {
  render() {
    return (
      <Alert color="danger" className="text-center">
        Une erreur est survenue :(
      </Alert>
    )
  }
}
