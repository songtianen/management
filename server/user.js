const express = require('express')
const Router = express.Router()
const model = require('./model/model')
const User = model.userModel
let encipher = require('./util/md5.js')

let MD5 = encipher.md5PWD
let Encrypt = encipher.Encrypt
let Decrypt = encipher.Decrypt

Router.get('/list', function(req, res) {
  User.find({}, function(err, doc) {
    if (err) {
      return res.json(err)
    }
    return res.json(doc)
  })
})
// 登陆
Router.post('/login', function(req, res) {
  const { userInfo } = req.body
  const DecryptUserInfo = JSON.parse(Decrypt(userInfo))
  const { username, password } = DecryptUserInfo.userInfo
  console.log('paramsparamsparamsparams', DecryptUserInfo, username)

  User.findOne({ username: username }, function(err, doc) {
    console.log('登陆之后查数据库', doc)
    if (err) {
      return res.json({code: 1, msg: '服务器错误'})
    }
    if (doc) {
      if (MD5(password) !== doc.pwd) return res.json({ code: 1, msg: '密码错误' })
      req.session.user = {
        loginName: doc.username,
        id: doc._id,
        avatar_url: doc.avatar_url,
        type: doc.type
      }
      const Info = JSON.stringify({
        code: 0,
        username: doc._id,
        type: doc.type,
        notificationCount: doc.notification.length
      })
      const Encryptdata = Encrypt(Info)
      // console.log('Encryptdata', Encryptdata)
      return res.json({ data: Encryptdata })
    } else {
      return res.json({code: 1, msg: '用户名不存在！'})
    }
  })
})
// 注册
Router.post('/register', function(req, res) {
  // let { username, pwd, type, inviteCode, captcha, prefix } = req.body
  const { regUserInfo } = req.body
  console.log('register-DecryptUserInfo', regUserInfo)
  // if (!regUserInfo) return res.json({ code: 1, msg: '请求参数错误' })
  const DecryptUserInfo = JSON.parse(Decrypt(regUserInfo))
  console.log('register-DecryptUserInfo', DecryptUserInfo)
  let { phone, password, type, inviteCode, captcha, prefix } = DecryptUserInfo
  password = MD5(password)
  phone = String(phone)
  User.findOne({ username: phone }, function(err, doc) {
    if (err) return res.json({code: 1, msg: '数据库查询错误'})
    if (doc) {
      return res.json({code: 1, msg: '手机已注册'})
    } else {
      User.create({ username: phone, pwd: password, type, inviteCode, captcha, prefix }, function(e, d) {
        if (e) return res.json({code: 1, msg: '数据库保存错误'})
        // console.log('ddddddd', d)
        req.session.user = {
          loginName: d.username,
          id: d._id,
          type: d.type,
          avatar_url: d.avatar_url
        }
        const Info = JSON.stringify({
          code: 0,
          username: d._id,
          type: d.type,
          msg: '数据库保存成功'
        })
        return res.json({data: Encrypt(Info)})
      })
    }
  })
})
// 登出
Router.post('/logout', function (req, res) {
  if (req.session.user) {
    req.session.user = null
    return res.json({ code: 1, msg: '退出成功' })
  }
  return res.json({ code: 1, msg: '退出成功' })
})
Router.get('/info', function(req, res) {
  const { user } = req.session
  if (user) return res.json({code: 0, id: user.id})
  return res.json({code: 1})
})

module.exports = Router
