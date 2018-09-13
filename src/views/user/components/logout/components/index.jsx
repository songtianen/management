
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import * as ActionCreator from '../actions'
import LogouFront from './logout'

// class Logout extends React.Component {
//   constructor(props) {
//     super(props)
//   }
//   componentDidMount() {
//     console.log('这是logout组件 componentDidMount', this.props)
//   }
//   render() {
//     if (this.props.loginCode === 1) {
//       return <Redirect to={{ pathname: '/login', state: { from: this.props.location.pathname } }} />
//     }
//     return (
//       <LogouFront
//         username={this.props.username}
//         actions={this.props.actions}
//       // loginCode={this.props.loginCode}
//       />
//     )
//   }
// }
const Logout = (props) => {
  if (props.loginCode === 1) {
    return <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
  }
  return (
    <LogouFront
      username={props.username}
      actions={props.actions}
    // loginCode={this.props.loginCode}
    />
  )
}
Logout.propTypes = {
  actions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  loginCode: PropTypes.number.isRequired,
}
const mapStateToProps = (state) => {
  let username = sessionStorage.getItem('USERNAME') || 'name'
  username = username.substring(0, 4)
  const loginCode = state.login.code || 2
  return {
    username,
    loginCode,
  }
}
const mapStateToDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(ActionCreator, dispatch),
  }
}


export default withRouter(connect(mapStateToProps, mapStateToDispatch)(Logout))

