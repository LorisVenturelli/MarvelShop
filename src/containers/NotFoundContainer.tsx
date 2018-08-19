import * as React from 'react'
import Jumbotron from '../components/Jumbotron'
import { Link } from 'react-router-dom'

export default class NotFoundContainer extends React.Component<any, any> {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="jumbotron-heading">Vous êtes perdu ?</h1>
          <p className="lead text-muted m-0">
            Parce que la page demandée n'existe pas :/
          </p>
          <div className="text-center mt-3">
            <Link to="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </Jumbotron>
        <section className="container app-content">
          <h4 className="text-center mb-4">
            Bon, pour pas laisser cette page totalement vide, un petit Lorem
            Ipsum ne fait jamais de mal !
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
            bibendum justo nisi, ut suscipit erat luctus sit amet. Vestibulum
            varius in nunc et iaculis. Nunc in risus vitae justo sollicitudin
            faucibus. Suspendisse vestibulum pellentesque eros ac faucibus. Sed
            luctus venenatis neque ac tempus. Duis vitae sagittis sem. In lorem
            risus, viverra vel condimentum ullamcorper, vestibulum quis ipsum.
            Etiam at efficitur diam, eu efficitur odio. Curabitur sodales, felis
            at lobortis volutpat, lorem velit maximus leo, facilisis
            pellentesque libero justo sit amet dui. Donec accumsan commodo nisi,
            quis feugiat risus ultricies maximus. Duis ornare diam sed iaculis
            ullamcorper. Integer sagittis leo et dolor mollis, tempus pulvinar
            neque feugiat. Maecenas in diam neque.
          </p>
          <p>
            Suspendisse potenti. Nullam vehicula, neque at vehicula eleifend,
            erat elit mattis ipsum, condimentum lacinia neque nulla et tellus.
            Pellentesque tellus enim, tempus vitae pharetra eu, vehicula et
            magna. Morbi ullamcorper tempus viverra. Ut vel scelerisque felis.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Vestibulum vulputate consequat erat in
            porta. Donec porta libero dui, at imperdiet neque hendrerit vel.
            Pellentesque condimentum ex a lacus dictum, porttitor semper mauris
            faucibus. Integer massa sapien, elementum a erat eget, semper auctor
            ipsum. Aliquam in posuere orci, non iaculis leo.
          </p>
          <p>
            Duis tincidunt tellus lacus, nec egestas tortor sollicitudin ut.
            Nullam facilisis risus at risus vulputate, non lacinia elit
            consectetur. Curabitur massa erat, fringilla at maximus eget, congue
            sed ex. Etiam placerat enim a ultricies consectetur. Integer pretium
            ex scelerisque, consequat purus id, placerat enim. Phasellus ac
            ultrices nunc. Donec faucibus ac metus id vulputate. Sed nec nibh ac
            mauris tincidunt dapibus. Donec quis risus quis sem porttitor
            fermentum. Nam sit amet luctus nulla, at varius tellus. Sed
            porttitor malesuada mauris eu dapibus.
          </p>
        </section>
      </div>
    )
  }
}
