
import React from 'react'
import PropTypes from 'prop-types'
import { Spin } from 'antd'
import Welcome from './welcome'
import MangeLists from './mange-lists'
import Find from './search-edit'


class Content extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    // console.log('当前页：：：：：：', this.props.navTopList)
  }
  render() {
    const contentList = this.props.navsideList.data
    const isFetching = this.props.navsideList.isFetching
    // const currentTopPage = this.props.navTopList.currentPage
    // const navSideCurrentPage = this.props.navsideList.currentPage
    return (
      <div style={{width: 870, background: '#f0f0f0'}}>
      这是content
        {
          isFetching ? (
            <Spin size="small" >正在 嘿嘿嘿... </Spin>
          )
            : null
        }

        {
          contentList ? (
            <div style={{ width: '100%', background: '#f0f2f5', padding: 10 }}>
              {/* <span>{`当前页:--${currentTopPage}--${navSideCurrentPage}`}</span> */}
              <Find />
              <MangeLists
                navsideList={this.props.navsideList}
              />
            </div>) : <Welcome />
      }
      </div>
    )
  }
}
Content.propTypes = {
  navsideList: PropTypes.object.isRequired,
  // navTopList: PropTypes.object.isRequired,
}

export default Content
