/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  observer,
  inject,
} from 'mobx-react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import AppState from '../../store/app-state.js'

@inject('appState') @observer
class TopicList extends Component {
  constructor(props) {
    super(props);
    this.state = { }
    this.changeName = this.changeName.bind(this)
  }

  changeName(e) {
    this.props.appState.changeName(e.target.value)
  }

  asyncBootrapper() {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.props.appState.count = 3
        resolve(true)
      }, 2000)
    })
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>this is topic list</title>
          <meta name="description" content="this is description" />
        </Helmet>
        <input type="text" onChange={(e) => this.changeName(e)} />
        <div>{ this.props.appState.msg}</div>
        <Button variant="outlined" color="primary">
          Primary
        </Button>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList;
