let mongoose = require('mongoose')
// const DB_URL = 'mongodb://localhost:27017/myapp'
// mongoose.connect(DB_URL)
const mallUserSchema = new mongoose.Schema({

  mail: {type: String},
  updateTime: { type: Date, default: Date.now },
  username: { type: String },
  nickname: { type: String },
  inviteCode: { type: String },
  captcha: { type: String },
  prefix: { type: String },
  pwd: { type: String },
  type: { type: String },
  avatar: { type: String },
  desc: { type: String },
  title: { type: String }
})

const MallUserModel = mongoose.model('MallUserModel', mallUserSchema)
module.exports = {
  MallUserModel
}
