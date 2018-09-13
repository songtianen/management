import React from 'react'
import PropTypes from 'prop-types' // eslint-disable-line
import UserFront from './user'

class User extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
  }
  render() {
    return (
      <UserFront />
    )
  }
}

export default User
