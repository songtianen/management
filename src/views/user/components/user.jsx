import React from 'react'
import PropTypes from 'prop-types' // eslint-disable-line
import _Notification from './notification'
import _Logout from './logout'

const Notification = _Notification.components
const Logout = _Logout.components
const Wrapper = ({ children }) => children
class User extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }

  render() {
    return (
      <Wrapper>
        <Notification />
        <Logout />
      </Wrapper>
    )
  }
}

export default User
