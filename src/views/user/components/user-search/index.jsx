
import React from 'react'
import PropTypes from 'prop-types' // eslint-disable-line
import { Button } from 'antd'


class GlobalSearch extends React.Component {
  componentDidMount() {

  }
  render() {
    return (
      <div style={{width: 200, borderBottom: 'solid 1px #f0f2f5', margin: '0 30px'}}>
        <input
          style={{
            display: 'block',
            float: 'left',
            height: 30,
            width: 150,
            boxSizing: 'border-box',
            border: 'none',
            outline: 0,
            margin: 0,
          }}
          type="text"
        />
        <Button style={{border: 'none', float: 'right'}} shape="circle" icon="search" />
      </div>
    )
  }
}
GlobalSearch.propTypes = {

}


export default GlobalSearch
