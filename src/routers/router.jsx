import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch } from 'react-router-dom'
import compoments, { IndexRoute } from '../views/components'
import { userStatus } from '../utils/util'
import AuthenticatedComponent from './auth-component'

// const Wrapper = ({ children }) => children

const {
  Register,
  Login,
  // asyncLogin,
} = compoments


const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = userStatus('get', { _key: 'TOKEN' })
  const isLogin = !!token
  return (
    <Route
      {...rest}
      render={
      (props) => {
        if (isLogin) return <Component {...props} />
        return <AuthenticatedComponent {...props} {...rest} />
      }
    }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
}

export default () => (
  // <Wrapper>
  //   <Route path="/" render={() => <Redirect to="/index" />} exact />
  //   <PrivateRoute path="/index" component={IndecRouter} exact />
  //   <PrivateRoute path="/index/:type" component={ContentPage} exact />
  //   <PrivateRoute path="/index/:type/:cate" component={DetailPage} exact />
  //   <Route path="/login" component={Login} />
  //   <Route path="/register" component={Register} />
  //   {/* <Route component={NotFount} /> */}
  // </Wrapper>
  <Switch>
    <Route path="/" render={() => <Redirect to="/index/products" />} exact />
    <PrivateRoute path="/index" component={IndexRoute} />
    <Route path="/login" component={Login} exact />
    <Route path="/register" component={Register} exact />
    {/* <PrivateRoute path="/qwe" render={() => <div>qwe</div>} exact /> */}
  </Switch>
)

