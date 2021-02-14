// import axios from 'axios'

// // 在跨域请求时，会携带用户凭证
// axios.defaults.withCredentials = true 

// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// // 判断用户登录状态是通过 token 来实现
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// // console.log(localStorage.getItem('token'))

// //post 请求时，发送 json 形式的数据包
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// // 创建axios实例
// const service = axios.create({
//   baseURL: '//47.99.134.126:28019/api/v1', // api的base_url
//   timeout: 5000, // 请求超时时间
//   withCredentials: true,
// })

// // service.interceptors.request.use(config => {
// //   config.headers['X-Requested-With'] = 'XMLHttpRequest';
// //   config.headers['token'] = localStorage.getItem('token') || '';
// //   config.headers['Content-Type'] = 'application/json'
// //   return config
// // }, error => {
// //   console.log(error)
// //   Promise.reject(error)
// // })

// // respone拦截器
// //interceptors 是拦截器，每个请求都会经过这个拦截器，返回的数据可以通过拦截处理后返回
// service.interceptors.response.use(res => {
//     if (typeof res.data !== 'object') {
//       console.log('服务端异常！') // $toast用不了
//       return Promise.reject(res)
//     }
//     if (res.data.resultCode != 200) {
//       if (res.data.message) console.log(res.data.message)
//       // 返回 416 代表没有登录状态，路由跳转到/login 页面
//       if (res.data.resultCode == 416) {
//         // this.$router.push({ path: '/login' }) // this指向错误
//         window.vRouter.push('/login')
//       }
//       return Promise.reject(res.data)
//     }
//     return res.data
//   })

// export default service

import axios from 'axios'

axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//47.99.134.126:28019/api/v1' : '//47.99.134.126:28019/api/v1'
// 在跨域请求时，会携带用户凭证
axios.defaults.withCredentials = true 

axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// 判断用户登录状态是通过 token 来实现
axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// console.log(localStorage.getItem('token'))

//post 请求时，发送 json 形式的数据包
axios.defaults.headers.post['Content-Type'] = 'application/json'
//interceptors 是拦截器，每个请求都会经过这个拦截器，返回的数据可以通过拦截处理后返回
axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    console.log('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.resultCode != 200) {
    if (res.data.message) console.log(res.data.message)
    // 返回 416 代表没有登录状态，路由跳转到/login 页面
    if (res.data.resultCode == 416) {
      // this.$router.push({ path: '/login' }) // this指向错误
      window.vRouter.push('/login')
    }
    return Promise.reject(res.data)
  }

  return res.data
})

export default axios