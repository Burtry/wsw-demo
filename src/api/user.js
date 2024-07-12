import instance from "@/utils/http"

export const loginAPI = (account, password) => {
    return instance({
        url: '/login',
        method: 'POST',
        params: {
            account: account,
            password: password
        }
    })

}

export const registerAPI = (params) => {
    return instance({
        url: '/register',
        method: 'POST',
        data: params
    })
}

export const updateUserInfoAPI = (params) => {
    return instance({
        url: '/user',
        method: 'put',
        data: params
    })
}

//分页获取用户信息
export function getUserInfoOfPageAPI(params) {
    return instance({
        url: "/usermanagement",
        method: "get",
        params: params
    })
}

//删除用户
export function deleteByIdAPI(id) {
    return instance({
        url: "/usermanagement",
        method: 'delete',
        params: { id }

    })
}

//重置用户密码
export function resetPasswordAPI(id) {
    return instance({
        url: "/usermanagement",
        method: 'put',
        params: { id }

    })
}

//验证当前身份
export function verifyIdentityAPI(id) {
    return instance({
        url: "/management",
        method: 'get',
        params: { id }

    })
}
