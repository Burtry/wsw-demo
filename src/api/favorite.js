import instance from '@/utils/http'

export function addFavoriteAPI(params) {
    return instance({
        url: '/user/favorite',
        method: 'post',
        data: params
    })
}

//获取该收藏数据
export function getFavoriteAPI() {
    return instance({
        url: '/user/favorite',
        method: 'get'
    })
}