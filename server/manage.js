const express = require('express')
const Router = express.Router()
const url = require('url')
const Mangemodel = require('./model/model')
const Mallmodel = require('./model/mall')

const Lists = Mangemodel.ProductManagementModel
const systemM = Mangemodel.SystemlimitsModel
const {MallUserModel} = Mallmodel

// let data = []
// for (let i = 0; i < 100; i++) {
//   data.push({
//     username: `1394697458${i}`,
//     nickname: `小米姑娘:${i}`,
//     mail: `songten@icloud.com:${i}`,
//     captcha: '',
//     prefix: '',
//     pwd: '',
//     type: '',
//     updateTime: Date.now()
//   })
// }

Router.get('/toplists', function (req, res) {
  const params = url.parse(req.url, true).query // eslint-disable-line
  const user = req.session.user
  // const products = params.tab
  if (user) {
    console.log('有session 或者 有 token')
    const loginName = user.loginName
    switch (params.tab) {
      case 'products':
        Lists.find({}, function (err, doc) {
          if (err) return res.json({ msg: '服务器错误' })
          if (doc.length === 0) {
            Lists.create({
              products: {
                name: '商品',
                key: 'products',
                lists: [{ name: '商品管理', key: 'productMange' }, { name: '品类管理', key: 'categoryMange' }]
              },
              order: {
                name: '订单',
                key: 'order',
                lists: [{ name: '订单管理', key: 'orderMange' }]
              },
              users: {
                name: '用户',
                key: 'users',
                lists: [{ name: '用户管理', key: 'usersMange' }]
              }
            }, function (e, d) {
              if (e) return console.log('商品 模型保存失败')
              if (d) return res.json({ code: 0, data: d, username: loginName })
            })
          }
          return res.json({code: 0, data: doc[0], username: loginName})
        })
        break
      case 'system':
        systemM.find({}, function (err, doc) {
          if (err) return res.json({ msg: '服务器错误' })
          if (doc.length === 0) {
            systemM.create({
              system_user: {
                name: '系统用户',
                key: 'system_user',
                lists: [{ name: '账号管理', key: 'accountMange' }, { name: '角色管理', key: 'partMange' }, {name: '权限管理', key: 'purview'}]
              },
              order: {
                name: '订单',
                key: 'order',
                lists: [{ name: '订单管理', key: 'orderMange' }]
              },
              users: {
                name: '用户',
                key: 'users',
                lists: [{ name: '用户管理', key: 'usersMange' }]
              }
            }, function (e, d) {
              if (e) return console.log('商品 模型保存失败')
              if (d) return res.json({ data: d })
            })
          }
          return res.json({ code: 0, data: doc[0], username: loginName })
        })
        break
      default:
        return res.json({ code: 1, msg: '请登录' })
    }
  } else {
    return res.json({code: 1, msg: '请登录'})
  }
})
Router.get('/navside', function(req, res) {
  const params = url.parse(req.url, true).query // eslint-disable-line
  const user = req.session.user
  console.log('------------session', req.session)
  console.log('------------session', params)
  if (user) {
    console.log('有session 或者 有 token')
    if (params.tab === 'products_usersMange') {
      MallUserModel.find({}, function(err, doc) {
        if (err) return res.json({ msg: '服务器错误' })
        if (doc.length === 0) {
          MallUserModel.create(
            {
              username: 13321187096,
              nickname: '小米姑娘',
              mail: 'songten@icloud.com',
              captcha: '',
              prefix: '',
              pwd: '',
              type: '',
              updateTime: Date.now()
            }, function(e, d) {
              if (e) return console.log('商品 模型保存失败')
              if (d) return res.json({ data: d })
            }
          )
        }
        // MallUserModel.insertMany(data, function (er, f) {
        //   if (er) console.log(er)
        // })
        return res.json({code: 0, data: doc})
      })
    }
  } else {
    return res.json({ code: 1, msg: '请求您登陆' })
  }
})
module.exports = Router
