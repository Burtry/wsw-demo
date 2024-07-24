import instance from '@/utils/http'

export function addFavoriteAPI(params) {
    return instance({
        url: '/user/favorite',
        method: 'post',
        data: params
    })
} 