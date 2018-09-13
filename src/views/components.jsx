import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom' // eslint-disable-line
import Loadable from 'react-loadable'


import _Container from './layout/container'
import _NavSide from './nav-side'
import _NavTop from './nav-top'
import _Login from './login'
import _Register from './register'
import _Layout from './layout'
import { Content, Welcome } from './content' // eslint-disable-line
import NotFount from '../components/not-fount'

const Wrapper = ({ children }) => children

const NavSide = _NavSide.components
const NavTop = _NavTop.components
const Login = _Login.components
const Register = _Register.components
const Container = _Container
const Layout = _Layout


const LoadableComponent = Loadable({
  loader: () => import(/* webpackChunkName: "Register" */ './login').then(login => console.log('异步加载login', login)),
  loading: () => <div>Loding</div>,
})

class asyncLogin extends React.Component {
  componentDidMount() {
  }
  render() {
    return <LoadableComponent />
  }
}


export default {
  NavSide,
  NavTop,
  Login,
  asyncLogin,
  Register,
  Container,
  Layout,
  // ContentPage,
  // IndexRouter,
  // DetailPage,
  NotFount,
  Content,
}

// sidebar组件
const CateRoute = ({ routes }) => (
  <Container >
    <NavSide />
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </Container>

)
CateRoute.propTypes = {
  routes: PropTypes.array.isRequired,
}

const routes = [
  {
    path: '/index/:type',
    component: NavTop,
    // routes: [{
    //   path: '/index/:type',
    //   component: NavTop,
    // }],
  },
  {
    path: '/index/:cate',
    component: CateRoute,
    routes: [{
      path: '/index/:cate/:detail',
      component: Content,
    }],
  },
]

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    // exact={route.exact}
    render={props => (
      <route.component {...props} routes={route.routes} />
    )}
  />
)
export const IndexRoute = () => (
  <Wrapper>
  RouteConfigExample
    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
  </Wrapper>

)
