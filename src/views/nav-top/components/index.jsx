
import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import * as actions from '../actions'
import NavTopFront from './navTop'
import { User, GlobalSearch } from '../../user'


class NavTop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: this.getTab(),
    }
    this.getTab = this.getTab.bind(this)
  }
  componentDidMount() {
    // console.log('这是NavTop-componentDidMount', this.props)
    const tab = this.getTab()
    // alert(tab) // eslint-disable-line
    // if (this.props.navTop.data) {
    //   return null
    // }
    if (!tab) {
      return null
    }

    this.props.actions.getNavLists(tab)
    return null
  }
  componentWillReceiveProps(nextProps) {
    // console.log('这是NavTop-componentWillReceiveProps', nextProps)
    if (nextProps.match.params.type && (nextProps.match.params.type !== this.props.match.params.type)) {
      this.setState({
        current: nextProps.match.params.type,
      })
      const tab = this.getTab(nextProps.match.params.type)
      this.props.actions.getNavLists(tab)
    }
  }
  getTab(tab) {
    let pathname = this.props.match.params.type
    tab = tab || pathname
    return tab
  }
  transferMsg(current) {
    this.setState({
      current,
    })
  }

  render() {
    return (
      <div style={{ width: 1000, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
        <span style={{ width: 130, textAlign: 'center', fontSize: 15, fontWeight: 'bold', color: '#87d068', borderRight: 'solid 1px #e8e8e8' }}>USER ADMINV-1</span>
        <NavTopFront
          history={this.props.history}
          current={this.state.current}
          transferMsg={current => this.transferMsg(current)}
        />
        <GlobalSearch />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><User /></div>
      </div>
    )
  }
}
NavTop.propTypes = {
  actions: PropTypes.object.isRequired,
  // navTop: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return { navTop: state.navTop }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavTop))

