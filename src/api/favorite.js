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

// 删除收藏数据
export function deleteFavoriteAPI(id) {
    return instance({
        url: '/user/favorite',
        method: 'delete',
        params: { id }
    })
}