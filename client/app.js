import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './views/App.jsx'

// ReactDOM.render(<App />,document.getElementById("app"))
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
)
