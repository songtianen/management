
import React from 'react'
import PropTypes from 'prop-types' // eslint-disable-line
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import NotifictionFront from './notification'
import * as ActionCreator from '../actions'


class Notification extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {

  }
  render() {
    const notificationCount = this.props.notificationCount
    const text = notificationCount === 0 ? <span>还没有通知呢</span> : <span>{`您有${notificationCount}条通知`}</span>
    return (
      <NotifictionFront
        text={text}
        notificationCount={notificationCount}
      />
    )
  }
}
Notification.propTypes = {
  notificationCount: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired, // eslint-disable-line
}

function mapStateToProps(state) {
  const notificationCount = state.login.notificationCount || 0
  return { notificationCount }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(ActionCreator, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(Notification)
