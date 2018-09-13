import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' // eslint-disable-line
import { clearStates } from '../redux/actions'
import { ClEARSTATES } from '../redux/constants'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom' // eslint-disable-line

class AuthenticatedComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let { dispatch } = this.props
    dispatch(clearStates({ viewType: ClEARSTATES, data: { code: 1 } }))
    // console.log('这是验证路由要跳转的', this.props)
  }
  render() {
    let {path} = this.props
    if (path === '/index') path = '/'
    return <Redirect exact to={{pathname: '/login', state: { from: path }}} />
  }
}
AuthenticatedComponent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
}

export default connect()(AuthenticatedComponent)
