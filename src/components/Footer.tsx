import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faHeart } from '@fortawesome/free-solid-svg-icons'

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-dark text-light p-4">
        <div className="container text-center">
          Think and <FontAwesomeIcon icon={faCode} /> with{' '}
          <FontAwesomeIcon icon={faHeart} /> for{' '}
          <a href="http://tabmo.io/" target="_blank">
            TabMo
          </a>
        </div>
      </footer>
    )
  }
}
