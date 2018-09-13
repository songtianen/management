import React from 'react'
import PropTypes from 'prop-types'

class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        width: 1000,
        height: 700,
        margin: '0 auto',
        backgroundColor: 'red',
      }}
      >
        {this.props.children}
      </div>
    )
  }
}

Content.propTypes = {
  children: PropTypes.node,
}
export default Content
