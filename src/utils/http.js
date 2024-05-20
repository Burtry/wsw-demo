import axios from 'axios'

const baseURL = '/api'
// 创建axios实例
const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000
})

instance.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        alert('请求失败')
        return Promise.reject(err)
    }
)
export default instance