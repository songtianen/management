import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Spin } from 'antd'
import map from 'lodash/map'

const SubMenu = Menu.SubMenu

class NavSideFront extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      current: this.props.getTab(),

    }
  }
  componentWillReceiveProps(nextProps) { //eslint-disable-line
    // console.log('这是NavSide子组件-componentWillReceiveProps', nextProps)
    this.setState({
      current: this.props.getTab(),

    })
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    })
    const URLParam = this.props.match.params.cate
    const currentUrl = e.key
    this.props.actions.getNavSideLists({ tab: `${URLParam}_${currentUrl}`, breadcrumb: '' })
    this.props.history.push({
      pathname: `/index/${URLParam}/${currentUrl}`,
    })
  }

  render() {
    const { syncing, navlistData } = this.props
    return (
      <div>
        {
          syncing ? (
            <Spin size="small" />
          )
            : null
        }

        <Menu
          mode="inline"
          onClick={this.handleClick}
          style={{ width: 130, border: 'none' }}
          // defaultOpenKeys={[this.props.currtentSubMenuKey.key]}
          selectedKeys={[this.state.current]}
        >
          {
            map(navlistData, i => <SubMenu key={i.key} title={i.name} >{map(i.lists, v => <Menu.Item key={v.key}>{v.name}</Menu.Item>)}</SubMenu>)
          }
        </Menu>
      </div>
    )
  }
}
NavSideFront.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  syncing: PropTypes.bool.isRequired,
  navlistData: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  // location: PropTypes.object.isRequired,
  getTab: PropTypes.func.isRequired,

}
export default NavSideFront
