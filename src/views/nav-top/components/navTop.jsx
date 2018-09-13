import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { tabs } from '../../../utils/variable-define'

class NavTop extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClick = (e) => {
    this.props.transferMsg(e.key)
    // this.props.actions.getNavLists(e.key)
    this.props.history.push({
      pathname: `/index/${e.key}`,
    })
  }
  render() {
    return (
      <Menu
        style={{border: 'none'}}
        onClick={this.handleClick}
        onOpenChange={this.onOpenChange}
        selectedKeys={[this.props.current]}
        mode="horizontal"
        // theme="dark"
      >
        {
            Object.keys(tabs).map(item => (
              <Menu.Item key={item} style={{float: 'right'}}>
                <span>{tabs[item]}</span>
              </Menu.Item>
            ))
          }
      </Menu>
    )
  }
}
NavTop.propTypes = {
  history: PropTypes.object.isRequired,
  current: PropTypes.string.isRequired,
  transferMsg: PropTypes.func.isRequired,
}

export default NavTop
