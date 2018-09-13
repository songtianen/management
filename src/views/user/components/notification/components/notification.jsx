import React from 'react'
import PropTypes from 'prop-types'

import { Icon, Badge, Tooltip } from 'antd'


const Notification = ({text, notificationCount}) => (
  <Tooltip placement="bottom" title={text}>
    <div style={{ width: 100, textAlign: 'center' }}>
      <Badge dot count={notificationCount}>
        <Icon type="sound" />
      </Badge>
      &nbsp;&nbsp;通知&nbsp;&nbsp;&nbsp;&nbsp;
    </div>
  </Tooltip>
)
Notification.propTypes = {
  text: PropTypes.node.isRequired,
  notificationCount: PropTypes.number.isRequired,
}
export default Notification

