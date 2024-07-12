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