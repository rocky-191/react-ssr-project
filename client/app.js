import React from 'react';
import ReactDOM from 'react-dom'

import App from './App.jsx'

// ReactDOM.render(<App />,document.getElementById("app"))
const renderMethod=module.hot?ReactDOM.render:ReactDOM.hydrate;
renderMethod(<App />,document.getElementById("root"))