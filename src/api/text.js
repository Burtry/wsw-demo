import instance from "@/utils/http"

export function textAPI(id) {
    return instance({
        url: `user/find/${id}`,
        method: 'get'
    })
}