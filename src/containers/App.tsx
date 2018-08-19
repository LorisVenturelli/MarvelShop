import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from '../components/Header'
import HomeContainer from './HomeContainer'
import CartContainer from './CartContainer'
import DetailContainer from './DetailContainer'
import SearchContainer from './SearchContainer'
import Footer from '../components/Footer'
import NotFoundContainer from './NotFoundContainer'

function App() {
  return (
    <Router>
      <div>
        <Header />

        <main role="main">
          <Switch>
            <Route path="/" component={HomeContainer} exact={true} />
            <Route path="/cart" component={CartContainer} exact={true} />
            <Route path="/product/:id" component={DetailContainer} />
            <Route path="/search/:query/:page?" component={SearchContainer} />
            <Route component={NotFoundContainer} />
          </Switch>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App
