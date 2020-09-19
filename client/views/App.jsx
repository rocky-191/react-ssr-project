import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import Routes from '../config/router.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  componentDidUpdate() {
    console.log('update', this.props)
  }

  render() {
    return (
      <>
        <Link to="/">首页</Link>
        <Link to="/detail">详情</Link>
        <Link to="/testApi">测试接口</Link>
        <Routes />
      </>
    )
  }
}

export default withRouter(App)
