import instance from "@/utils/http"

export function textAPI(params) {
    return instance({
        url: '/user/find',
        method: 'get',
        params: params
    })
}

export function textPostAPI(params) {
    return instance({
        url: '/user/find',
        method: 'post',
        data: params
    })
}