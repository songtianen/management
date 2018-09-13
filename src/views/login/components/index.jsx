
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { withRouter } from 'react-router-dom'

import * as ActionCreator from '../actions'
import LoginItems from './login'
import './style.less'

const Login = ({ actions, loginState }) => (
  <div className="container">
    <LoginItems
      actions={actions}
      loginState={loginState}
          // history={this.props.history}
    />
  </div>
)
Login.propTypes = {
  loginState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return { loginState: state.login }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(ActionCreator, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
