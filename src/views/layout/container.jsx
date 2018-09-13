import React from 'react'
import PropTypes from 'prop-types'

class Container extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        width: 1000,
        height: 800,
        margin: '0 auto',
        overflow: 'hidden',
        backgroundColor: 'yellow',
      }}
      >
        {this.props.children}
      </div>
    )
  }
}

Container.propTypes = {
  children: PropTypes.node,
}
export default Container
