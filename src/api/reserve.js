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

//更新预约状态
export function updateReservationStatusAPI(id, status) {
    return instance({
        url: `/reservations/status/${id}`,
        method: 'put',
        params: { status }
    })
}

//用户端text
export function getReserveTextAPI(radioStatus) {
    return instance({
        url: `/user/reservation`,
        method: 'get',
        params: { radioStatus }
    })
}

//用户端用户添加预约
export function addReserveAPI(params) {
    return instance({ url: '/user/reservation', method: 'post', data: params }

    )
}

//根据当前时间获取已有预约信息
export function getReserveInfoAPI(dateTime, id) {
    return instance({
        url: '/user/reservation/date',
        method: 'get',
        params: {
            localDateTime: dateTime,
            spaceId: id
        }
    })
}


//获取该场地所有预约时间
export function getReserveAllAPI(id) {
    return instance({
        url: '/user/reservation/dateAll',
        method: 'get',
        params: { spaceId: id }
    })
}