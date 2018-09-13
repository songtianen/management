
import React from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Avatar, Menu } from 'antd'


class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick() {
    // console.log('click', e)
    this.props.actions.dologout()
    // console.log('>>>>>>>', this.props)
  }
  Menus = () => (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item key="1">个人中心</Menu.Item>
      <Menu.Item key="2">退出登陆</Menu.Item>
    </Menu>
  )

  render() {
    return (
      <Dropdown overlay={this.Menus()}>
        <span>
          <Avatar src={''} size="small" icon="user" />
          <span style={{paddingLeft: 10}}>{this.props.username}</span>
        </span>

      </Dropdown>
    )
  }
}

Logout.propTypes = {
  // code: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
}
export default Logout
