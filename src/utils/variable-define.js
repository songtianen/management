import React from 'react'

export const tabs = {
  products: '商品',
  system: '系统',
  buyer: '采购',
  finance: '财务',
  customer: '客服',
  statistics: '统计',
}

export const usersColumnsSchema = [
  { title: 'ID', width: 200, dataIndex: 'id', key: 'id', fixed: 'left' },
  { title: '用户名', width: 150, dataIndex: 'username', key: 'username', fixed: 'left' },
  { title: '电话', dataIndex: 'phone', key: '1', width: 150 },
  { title: '邮箱', dataIndex: 'mail', key: '2', width: 200 },
  { title: '年龄', dataIndex: 'age', key: '4', width: 80 },
  { title: '地址', dataIndex: 'address', key: '3' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    dataIndex: 'id',
    render: () => <a href="#">编辑</a>, // eslint-disable-line
  },
]

export default {
  tabs,
}
