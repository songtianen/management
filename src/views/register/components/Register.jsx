import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as ActionCreator from '../actions'
import WrapRegister from './wrap-register'
import './style.less'

class Register extends React.Component {
  componentDidMount() {
  }
  render() {
    if (this.props.user.redireactTo) return <Redirect to={this.props.user.redireactTo} />
    return (
      <div className="container">
        <WrapRegister
          user={this.props.user}
          actions={this.props.actions}
        />
      </div>
    )
  }
}
Register.propTypes = {
  user: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
}
function mapStateToProps(state) {
  return { user: state.register }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(ActionCreator, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
