import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from '../components/Header'
import HomeContainer from './HomeContainer'
import CartContainer from './CartContainer'
import DetailContainer from './DetailContainer'

function App() {
  return (
    <Router>
      <div>
        <Header />

        <main role="main">
          <Route path="/" component={HomeContainer} exact={true} />
          <Route path="/cart" component={CartContainer} exact={true} />
          <Route path="/product/:id" component={DetailContainer} />
        </main>
      </div>
    </Router>
  )
}

export default App
