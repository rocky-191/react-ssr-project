import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'

import App from './views/App.jsx'
import Appstate from './store/app-state.js'

// ReactDOM.render(<App />,document.getElementById("app"))
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(
  <Provider appState={new Appstate()}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
