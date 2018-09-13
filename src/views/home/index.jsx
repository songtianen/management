/*
：存放被 connect 后的 React 容器组件，最典型的就是 App，即应用组件。
根目录下也会有 index.js，通常它会被要求 export 出
App as default，即一级子应用的根容器组件（已被 connect
reducer，即该应用的根 reducer 这个 reducer 又有可能会被再次 combineReducers()
并且链接到最外层的总store中

*/
import React from 'react'
// import PropTypes from 'prop-types'
// import { connect } from 'react-redux'
// 注意！！这里用了connect 路由就没办法刷新了
import Routes from '../../routers/router'
import Layout from '../layout'
// import _NavTop from '../nav-top'
// import _NavsSide from '../nav-side'
// import './index.less'

// const NavTop = _NavTop.components
// const NavsSide = _NavsSide.components

class App extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {

    }
  }
  componentDidMount() {
    // do some thing
    // console.log('-----', this.props)
  }
  render() {
    return (
      <Layout>
        {/* <NavTop /> */}
        <Routes />
      </Layout>
    )
  }
}
// App.propTypes = {
//   s: PropTypes.object.isRequired,
// }
// const mapStateToProps = (state) => {
//   return { s: state }
// }
// const mapDispatchToProps = () => {
//   return {
//     // addGUN, removeGUN, addGunAsync,
//   }
//   // return bindActionCreators({ addGUN, removeGUN, addGunAsync }, dispatch) // 注入指定action creator
// }
// 省略第二个参数 程序自动会 为组件 注入 dispatch ，
// 如果有第二个参数且 没有bindActionCreators，action的出发就必须用 store.dispatch
// 如果有bindActionCreators，action creator, 会自动执行dispatch
export default App

