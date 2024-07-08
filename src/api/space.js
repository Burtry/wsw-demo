import instance from "@/utils/http"

//获取场地信息
export function getSpaceAPI(params) {
    return instance(
        {
            url: "/space",
            method: "get",
            params: params
        }
    )
}

//新增场地
export function addSpaceAPI(params) {
    return instance(
        {
            url: "/space",
            method: "post",
            data: params
        }
    )
}

//删除场地
export function deleteSpaceAPI(id) {
    return instance(
        {
            url: "/space",
            method: "delete",
            params: { id }
        }
    )
}

//更新场地
export function updateSpaceAPI(params) {
    return instance(
        {
            url: "/space",
            method: "put",
            data: params
        }
    )
}
//根据id查询场地
export function getSpaceByIdAPI(id) {
    return instance(
        {
            url: "/space/id",
            method: "get",
            params: { id: id }
        }
    )
}