import * as React from 'react'
import { render } from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'

import reducers from './reducers'
import App from './containers/App'

import './assets/theme/main.scss'

const store = createStore(reducers, applyMiddleware(...[reduxThunk]))

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
