import instance from '@/utils/http'


//获取器材信息
export function getEquipmentAPI(params) {
    return instance({
        url: '/equipment',
        method: 'get',
        params: params
    })
}

//获取全部器材
export function getAllEquipmentAPI() {
    return instance({
        url: '/equipment/equipmentAll',
        method: 'get'
    })
}

//新增器材
export function addEquipmentAPI(params) {
    return instance({
        url: '/equipment',
        method: 'post',
        data: params
    })
}

//删除器材
export function deleteEquipmentAPI(id) {
    return instance({
        url: '/equipment',
        method: 'delete',
        params: { id }
    })
}

//更新器材
export function updateEquipmentAPI(params) {
    return instance({
        url: '/equipment',
        method: 'put',
        data: params
    })
}
//根据器材id获取器材
export function getEquipmentByIdAPI(id) {
    return instance({
        //路径参数传递
        url: `/equipment/${id}`,
        method: 'get'

    })
}