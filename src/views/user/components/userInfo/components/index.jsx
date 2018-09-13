
import React from 'react'
import PropTypes from 'prop-types' // eslint-disable-line
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ActionCreator from '../actions'


class Login extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div className="container">
        userInfo
      </div>
    )
  }
}
Login.propTypes = {

}

function mapStateToProps(state) {
  return { loginState: state.login }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(ActionCreator, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
