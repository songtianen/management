// // login 接口的代理
// const router = require('express').Router()
// const axios = require('axios')

// const baseUrl = 'https://cnodejs.org/api/v1'

// router.post('/login', (req, res, next) => { // eslint-disable-line
//   axios.post(`${baseUrl}/accesstoken`, {
//     accesstoken: req.body.accessToken
//   })
//     .then((resp) => {
//       if (resp.status === 200 && resp.data.success) {
//         req.session.user = {
//           accessToken: req.body.accessToken,
//           loginname: resp.data.loginname,
//           id: resp.data.id,
//           avatar_url: resp.data.avatar_url
//         }
//         res.json({
//           success: true,
//           data: resp.data
//         })
//       }
//     })
//     .catch((err) => {
//       if (err.response) {
//         res.json({
//           success: false,
//           data: err.response
//         })
//       } else {
//         next(err) // 错误抛给全局的错误处理器 处理
//       }
//     })
// })

// module.exports = router
