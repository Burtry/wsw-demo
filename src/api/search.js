import instance from '@/utils/http'

export function searchAPI(searchInput) {
    return instance({
        method: 'get',
        url: `/search/${searchInput}`,


    })
}