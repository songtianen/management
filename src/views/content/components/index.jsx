
import React from 'react'
import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// import * as ActionCreator from '../actions'
import ContentFornt from './content'


class Content extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <ContentFornt
         // actions={this.props.actions}
        loginState={this.props.loginState}
        navsideList={this.props.navsideList}
        navTopList={this.props.navTopList}
      />
    )
  }
}
Content.propTypes = {
  loginState: PropTypes.object.isRequired,
  navsideList: PropTypes.object.isRequired,
  navTopList: PropTypes.object.isRequired,
  // actions: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    loginState: state.login,
    navsideList: state.navSide,
    navTopList: state.navTop,
  }
}
// function mapDispatchToProps(dispatch) {
//   return { actions: bindActionCreators(ActionCreator, dispatch) }
// }


export default withRouter(connect(mapStateToProps)(Content))
