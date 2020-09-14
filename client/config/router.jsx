import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'

export default () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/list" />} />
    <Route path="/list" component={TopicList} />
    <Route path="/detail" component={TopicDetail} />
  </Switch>
)
