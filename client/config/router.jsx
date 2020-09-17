import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'
import ApiTest from '../views/test/api.test.js'

export default () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/list" />} />
    <Route path="/list" component={TopicList} />
    <Route path="/detail" component={TopicDetail} />
    <Route path="/testApi" component={ApiTest} />
  </Switch>
)
