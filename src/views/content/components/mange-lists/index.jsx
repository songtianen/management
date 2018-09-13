import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { usersColumnsSchema } from '../../../../utils/variable-define'

// console.log('ddddddd', usersColumnsSchema)
class MangaeLists extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
    // console.log('mange-list-Props', this.props)
  }
  render() {
    const data = [];
    const listData = this.props.navsideList.data
    for (let i = 0; i < listData.length; i++) { // eslint-disable-line
      data.push({
        key: i,
        username: listData[i].nickname,
        age: 32,
        phone: listData[i].username,
        id: listData[i]._id, // eslint-disable-line
        mail: listData[i].mail,
        address: `中国 河北省 请到河北省来吃驴肉火烧  ${i}`,
      })
    }
    return (
      <Table
        bordered={false}
        style={{width: '100%'}}
        pagination={{pageSize: 20}}
        size="small"
        columns={usersColumnsSchema}
        dataSource={data}
        scroll={{ x: 1200, y: 500 }}
      />
    )
  }
}
MangaeLists.propTypes = {
  navsideList: PropTypes.object.isRequired,
}

export default MangaeLists
