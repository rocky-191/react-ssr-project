import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'

import App from './views/App.jsx'
import appState from './store/app-state'

// ReactDOM.render(<App />,document.getElementById("app"))
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(
  <Provider appState={appState}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
