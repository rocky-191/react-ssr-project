import React, { Component } from 'react';
import axios from 'axios'

/* eslint-disable */
// const BaseUrl="http://localhost:3000"
class TestApi extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    // this.getTopics = this.getTopics.bind(this)
    // this.login = this.login.bind(this)
    // this.markAll = this.markAll.bind(this)
  }

  getTopics() {
    axios.get('/api/topics').then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    });
  }

  login() {
    // 输入自己的accesstoken进行测试，登录cnode 设置界面即可查看到
    axios.post('/api/user/login', {
      accessToken: 'xx',
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true',{
      accessToken: 'xx'
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    });
  }

  render() {
    return (
      <>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </>
    );
  }
}

/* eslint-enable */

export default TestApi;
