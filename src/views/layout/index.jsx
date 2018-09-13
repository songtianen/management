import React from 'react'
import PropTypes from 'prop-types'

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // console.log('NavTopNavTopNavTopNavTop', NavTop)
  }
  render() {
    return (
      <div style={{backgroundColor: '#fdfdfd'}}>
        {this.props.children}
      </div>
    )
  }
}
Layout.propTypes = {
  children: PropTypes.node,
}
export default Layout
