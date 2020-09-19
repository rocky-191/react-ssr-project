/* eslint-disable react/destructuring-assignment */
import React, { Component } from 'react';
import {
  observer,
  inject,
} from 'mobx-react'
import PropTypes from 'prop-types'
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
        <input type="text" onChange={(e) => this.changeName(e)} />
        <div>{ this.props.appState.msg}</div>
      </div>
    );
  }
}

TopicList.propTypes = {
  appState: PropTypes.instanceOf(AppState),
}

export default TopicList;
