import * as React from 'react'
import Series from './Series'
import { SeriesModel } from '../constants/InterfaceTypes'

interface AlbumProps {
  products: SeriesModel[]
}

export default class SeriesList extends React.Component<AlbumProps, any> {
  render() {
    const error = null
    const isLoaded = true

    return (
      <div className="album py-5 bg-light">
        <div className="container">
          {error && <div>Error: {error}</div>}

          {!isLoaded && <div>Loading...</div>}

          {!error &&
            isLoaded && (
              <div className="row">
                {this.props.products.map((item) => (
                  <div key={item.id} className="col-md-4">
                    <Series item={item} />
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    )
  }
}
