import axios from 'axios'

var http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
})

export default http