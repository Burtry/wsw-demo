import instance from '@/utils/http'

//上传图片
export function uploadImageImgAPI(file) {
    const formData = new FormData();
    formData.append('file', file);

    return instance({
        url: '/common/upload',
        method: 'put', // 注意这里使用的是 PUT 方法
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}