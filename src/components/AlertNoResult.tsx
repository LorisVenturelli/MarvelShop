import * as React from 'react'
import { Alert } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default class AlertNoResult extends React.Component {
  render() {
    return (
      <Alert color="info" className="text-center">
        Aucun résultat
      </Alert>
    )
  }
}
