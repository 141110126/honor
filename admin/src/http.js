import axios from 'axios'
import Vue from 'vue'
var http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

http.interceptors.request.use(
  config => {
    let token = localStorage.getItem('token')
    console.log(token);
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
      console.log(config.headers);
    }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

http.interceptors.response.use((res) =>{
  // 拦截器这边一定要返回获取到的数据，后面才能接收并使用这些数据
  return res;
},(err) => {
  console.log(err)
  Vue.prototype.$message({
    type: 'error',
    message: err.response.data.message
  })
  return Promise.reject(err)
}) 
// console.log(http.interceptors.response)
export default http