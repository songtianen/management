
let mongoose = require('mongoose')
const isEnv = process.env.NODE_ENV
console.log('这是数据mongodb数据库', isEnv)
let DB_URL = 'mongodb://localhost:27017/myapp'
// 1 . 连接数据库
mongoose.connect(DB_URL)
var dbm = mongoose.connection
// 监听数据库
dbm.on('error', console.error.bind(console, 'connection error:'))
dbm.once('open', function () {
  // we're connected!
  console.log('欢迎 mongoose!!')
})

const productsSchema = new mongoose.Schema({
  categoryId: { type: Number },
  id: { type: Number },
  imageHost: { type: String },
  mainImage: { type: String },
  name: { type: String },
  price: { type: Number },
  status: { type: Number },
  subtitle: { type: String }})

let ProductsModel = mongoose.model('Products', productsSchema)

const productManagementSchema = new mongoose.Schema({
  products: {
    name: {type: String},
    key: {type: String},
    lists: [{ name: { type: String }, key: { type: String } }, { name: { type: String }, key: { type: String } }]
  },
  order: {
    name: { type: String },
    key: { type: String },
    lists: [{ name: { type: String }, key: { type: String } }]
  },
  users: {
    name: { type: String },
    key: { type: String },
    lists: [{ name: { type: String }, key: { type: String } }]
  }
})
let ProductManagementModel = mongoose.model('ProductManagementSchema', productManagementSchema)

const systemManagementSchema = new mongoose.Schema({
  system_user: {
    name: { type: String },
    key: { type: String },
    lists: [{ name: { type: String }, key: { type: String } }, { name: { type: String }, key: { type: String } }]
  },
  order: {
    name: { type: String },
    key: { type: String },
    lists: [{ name: { type: String }, key: { type: String } }]
  },
  users: {
    name: { type: String },
    key: { type: String },
    lists: [{ name: { type: String }, key: { type: String } }]
  }
})
let SystemlimitsModel = mongoose.model('usersManagementSchema', systemManagementSchema)

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  nickname: { type: String, require: true },
  inviteCode: { type: String, require: true },
  captcha: { type: String, require: true },
  prefix: { type: String, require: true },
  pwd: { type: String, require: true },
  phone: { type: String, require: true },
  type: { type: String, require: true },
  notification: [{
    name: {type: String},
    title: {type: String},
    details: {type: String}
  }],
  avatar: { type: String },
  desc: { type: String },
  title: { type: String }
})

let userModel = mongoose.model('User', userSchema)
module.exports = {
  userModel,
  ProductManagementModel,
  ProductsModel,
  SystemlimitsModel
}
