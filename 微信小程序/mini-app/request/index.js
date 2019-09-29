

//声明变量存储请求的次数
let requestTimes = 0

//promise形式的 请求的方法
export const request = (params) => {
  //发送了几个,被递增几个
  requestTimes++
  //显示加载
  wx.showLoading({
    title: '加载中',
    mask: true //显示遮罩,防止触摸穿透
  })

  //公共的url
  const baseUrl = 'https://api.zbztb.cn/api/public/v1'
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success(res) {
        // resolve(res)
        // console.log(res)
        if (res.data.meta && res.data.meta.status === 200) {
          resolve(res.data.message)
        } else {
          reject(err)
        }
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

//promise形式的 获取权限
export const getSetting = () => {
  return new Promise((resolve,reject) => {
    wx.getSetting({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

//promise形式的 打开授权页面
export const openSetting = () => {
  return new Promise((resolve,reject) => {
    wx.openSetting({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

//promise形式的 获取收获地址
export const chooseAddress = () => {
  return new Promise((resolve,reject) => {
    wx.chooseAddress({
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}