import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'mobx-react'

import { MuiThemeProvider } from '@material-ui/core/styles'
import App from './views/App.jsx'
import Appstate from './store/app-state.js'
import theme from './config/theme'
// ReactDOM.render(<App />,document.getElementById("app"))
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;
renderMethod(
  <Provider appState={new Appstate()}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
)
