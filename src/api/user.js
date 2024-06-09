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