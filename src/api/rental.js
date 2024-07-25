import instance from '@/utils/http.js'

//分页获取租借记录

export function getRentalPageAPI(params) {
    return instance({
        url: '/rentals',
        method: 'get',
        params: params
    })

}

//根据id删除租借记录
export function deleteRentalByIdAPI(id) {
    return instance({
        url: `/rentals/${id}`,
        method: 'delete'
    })
}

//更新租借记录
export function updateRentalAPI(params) {
    return instance({
        url: '/rentals',
        method: 'put',
        data: params
    })

}

//修改租借状态
export function updateRentalStatusAPI(id, status) {
    return instance({
        url: `/rentals/status/${id}`,
        method: 'put',
        params: { status }
    })
}

//用户端获取租借信息
export function getUserRentalAPI(radioStatus) {
    return instance({
        url: '/user/rentals',
        method: 'get',
        params: { radioStatus }
    })
}

//用户端添加租借记录
export function addUserRentalAPI(params) {

    return instance({
        url: '/user/rentals',
        method: 'post',
        data: params
    })
}

