// 封装了请求的方法

//声明变量存储请求的次数
let requestTimes = 0

export const request = (params) => {
    //发送了几个,被递增几个
    requestTimes++
    //显示加载
    wx.showLoading({
        title : '加载中',
        mask : true  //显示遮罩,防止触摸穿透
    })

    //公共的url
    const baseUrl = 'https://api.zbztb.cn/api/public/v1/home'
    return new Promise((resolve,reject) => {
        wx.request({
            ...params,
            url : baseUrl + params.url,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                requestTimes--
                // if(requestTimes === 0) {
                //     wx.hideLoading()
                // }
                requestTimes === 0 && wx.hideLoading()
            }
        })
    })
}