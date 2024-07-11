import instance from '@/utils/http'

//分页获取预约数据
export function getReserveListOfPageAPI(params) {
    return instance({
        url: '/reservations',
        method: 'get',
        params: params
    })
}

//根据id删除预约数据
export function deleteReserveByIdAPI(id) {
    return instance({
        url: `/reservations/${id}`,
        method: 'delete'
    })
}

//更新预约
export function updateReserveAPI(params) {
    return instance({
        url: '/reservations',
        method: 'put',
        data: params
    })
}