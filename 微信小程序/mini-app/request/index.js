

//声明变量存储请求的次数
let requestTimes = 0

//promise形式的 请求的方法
export const request = (params) => {

  //检测是否需要给请求头携带token ， 通过判断url有没有 /my/

  let header = {...params.header}

  if(params.url.includes('/my/')) {
    header["Authorization"] = wx.getStorageSync('token')
  }

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
      header,
      url: baseUrl + params.url,
      success(res) {
        // resolve(res)
        // console.log(res)
        if (res.data.meta && res.data.meta.status === 200) {
          resolve(res.data.message)
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

//promise形式的 弹窗
export const showModal = (params) => {
  return new Promise((resolve,reject) => {
    wx.showModal({
      ...params,
      success (res) {
        resolve(res.confirm)
      }
    })
  })
}

//promise形式的 消息提示
export const showToast = (params) => {
  return new Promise((resolve,reject) => {
    wx.showToast({
      ...params,
      success: (result) => {
        resolve(result)
      }
    })
  })
}

//promise形式的 微信登录
export const wxlogin = () => {
  return new Promise((resolve,reject) => {
    wx.login({
      timeout:10000,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    });
      
  })
}

//promise形式的 内置支付
export const requestPayment = (pay) => {
  return new Promise((resolve,reject) => {
    wx.requestPayment({
      ...pay,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    });     
  })
}