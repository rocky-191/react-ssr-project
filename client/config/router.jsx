/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import {
  observer,
  inject,
} from 'mobx-react'
import TopicList from '../views/topic-list'
import TopicDetail from '../views/topic-detail'
import ApiTest from '../views/test/api.test.js'
import Login from '../views/login'

// 判断是否需要登录才能访问组件
const PrivateRoute = ({ isLogin, component: Component, ...rest }) => {
  <Route
    {...rest}
    render={(props) => (
      isLogin
        ? <Component {...props} />
        : (
          <Redirect
            to={{
              pathname: '/login',
              search: `?from=${rest.path}`,
            }}
          />
        )
    )}
  />
}

// eslint-disable-next-line no-unused-vars
const InjectedPrivateRoute = inject((stores) => ({
  isLogin: stores.appState.user.isLogin,
}))(observer(PrivateRoute))

PrivateRoute.propTypes = {
  isLogin: PropTypes.bool,
  component: PropTypes.element.isRequired,
}

PrivateRoute.defaultProps = {
  isLogin: false,
}

export default () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/list" />} />
    <Route path="/list" component={TopicList} />
    <Route path="/testApi" component={ApiTest} />
    <Route path="/login" component={Login} />
    {/* <Route path="/detail" component={TopicDetail} /> */}
    <InjectedPrivateRoute path="/detail" component={TopicDetail} />
  </Switch>
)
