import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from "@/stores/user";
import router from '@/router';

const baseURL = '/api'
// 创建axios实例
const instance = axios.create({
    baseURL: baseURL,
    timeout: 50000
})

// axios请求拦截器
instance.interceptors.request.use(config => {
    const userStore = useUserStore()

    const token = userStore.userInfo.token
    if (token) {
        config.headers.token = token
    }
    return config
}, e => Promise.reject(e))


//响应拦截器
instance.interceptors.response.use(res => res.data, e => {
    const userStore = useUserStore()
    // ElMessage({ message: e.response.data.msg, type: 'error' })
    //401处理
    if (e.response.status === 401) {
        userStore.removeUserInfo()
        ElMessage({ type: 'error', message: '登录过期，请重新登录' });
        router.push('/login')
    }
    return Promise.reject(e)
})
export default instance