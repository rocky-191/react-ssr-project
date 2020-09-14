import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Routes from '../config/router'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render() {
    return (
      <>
        <Link to="/">首页</Link>
        <Link to="/detail">详情</Link>
        <Routes />
      </>
    )
  }
}

export default App
