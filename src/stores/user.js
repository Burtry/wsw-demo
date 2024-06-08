import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/api/user";
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore("user", () => {
    const userInfo = ref({})

    // 获取用户信息
    const getUserInfo = async (account, password) => {
        const res = await loginAPI(account, password)
        if (res.code === 0) {
            //账号不存在
            ElMessage({ type: 'error', message: res.msg });
            return;
        }
        userInfo.value = res.data
    }

    //移除用户信息
    const removeUserInfo = () => {
        userInfo.value = {}
    }

    return {
        userInfo,
        getUserInfo,
        removeUserInfo
    }
}, {
    persist: true
})