import React from 'react'
import PropTypes from 'prop-types' //eslint-disable-line
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import filter from 'lodash/filter'
import NavSideFront from './navSide'
import * as actions from '../actions'


class NavSide extends React.Component {
  constructor(props) {
    super(props)

    this.getTab = this.getTab.bind(this)
    // this.getopenKeys = this.getopenKeys.bind(this)
  }
  componentDidMount() {
    // let pathname = this.props.match.params.type
    // const { requestfield } = this.props.navLists
    let location = this.props.location.pathname
    let url = this.props.match.url
    // console.log('这是NavSide-componentDidMount', this.props)
    if (!this.props.match.params.cate) {
      return null
    }
    if (location === url) {
      return null
    }
    const tab = this.getTab()

    this.props.actions.getNavSideLists({ tab: `${this.props.match.params.cate}_${tab}`, currentPage: '' })
    return null
  }
  componentWillReceiveProps(nextProps) { //eslint-disable-line
    // console.log('这是NavSide-componentWillReceiveProps', nextProps)
  //   if (nextProps.match.params.cate && (nextProps.match.params.cate !== this.props.match.params.cate)) {
  //     const tab = this.getTab(nextProps.match.params.type)
  //     let pathname = this.props.match.params.type
  //     this.props.actions.getNavSideLists({ tab: `${pathname}_${tab}`, breadcrumb: '' })
  //   }
  }
  // ------------------------------
  // getopenKeys = (data) => {
  //   const current = this.getTab()

  //   const dataArr = [].concat(...data)
  //   console.log('这是 getopenKeys', dataArr)
  //   // const dataArr = _.filter(data, o => o.lists)
  //   const dataAr = dataArr.find((j) => {
  //     return j.lists.find(i => i.key === current)
  //   })
  //   console.log('这是getopenKeys', dataAr)

  //   const obj = Object.assign({}, dataAr)
  //   return obj
  // }
  // ------------------------------

  getTab(tab) {
    let location = this.props.location.pathname
    let url = this.props.match.url
    tab = tab || location.replace(`${url}/`, '').trim()
    // alert(location.replace(`${url}/`, '').trim()) // eslint-disable-line
    return tab
  }


  render() {
    const navlistData = filter(this.props.navLists.data, o => o.name)
    // const currtentSubMenuKey = this.getopenKeys(navlistData)
    return (
      <NavSideFront
        match={this.props.match}
        history={this.props.history}
        navlistData={navlistData}
        location={this.props.location}
        actions={this.props.actions}
        syncing={this.props.navLists.syncing}
        getTab={this.getTab}
        // currtentSubMenuKey={currtentSubMenuKey}
      />
    )
  }
}

NavSide.propTypes = {
  navLists: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}
function mapStateToProps(state) {
  return {
    navLists: state.navTop,
    // navSideLists: state.navSide,
  }
}
function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavSide))
