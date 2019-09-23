// 封装了请求的方法

export const request = (params) => {
    return new Promise((resolve,reject) => {
        const baseUrl = 'https://api.zbztb.cn/api/public/v1/home'
        wx.request({
            ...params,
            url : baseUrl + params.url,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}