
// const proxy = require('http-proxy-middleware')
const userRouter = require('../user.js')
const manageRouter = require('../manage.js')
// const session = require('express-session')
module.exports = (app) => {
  // 把静态文件全部代理到 这个服务上面
  // app.use('/public', proxy({
  //   target: 'http://localhost:8888'
  // }))
  // app.use(session({ // 设置session
  //   maxAge: 10 * 60 * 10000,
  //   name: 'tid', // session 会放一个 cooke id 在浏览器端 的名字
  //   resave: false, // 每次请求 是否重新 放一个cookie id
  //   saveUninitialized: false,
  //   secret: 'song' // 加密用的字符串
  // }))
  app.use('/user', userRouter)
  app.use('/manage', manageRouter)
  app.get('*', (req, res, next) => { // eslint-disable-line
    console.log('123')
    res.send('<div>hello</div>')
  })
}
