/**
 * 1 获取用户token
 *   1 构成参数
 *     1  来自于执行小程序的获取用户信息
 *     2  来自于执行小程序登录后的code
 *   2 发送给服务器获取token
 * 
 * 2 token获取成功后
 *   1 把token存在本地
 *   2 返回上一页
 * 
 * 
 */
import regeneratorRuntime from '../../lib/runtime/runtime'
import { wxlogin ,request} from '../../request/index'

Page({
  //点击授权
  handleGetuserinfo(e) {
    //调用获取token的方法
    this.getToken(e)
  },

  //获取用户token的方法
 async getToken(e) {
    const {code} = await wxlogin()
    const {encryptedData,iv,rawData,signature} = e.detail
    
    //拼接参数
    const tokenPrams = {
      code,
      encryptedData,
      iv,
      rawData,
      signature
    }

    //发送请求
    const res = await request({url : '/users/wxlogin',method : 'post',data :tokenPrams})
    
    //把token存在本地
    wx.setStorageSync('token', res.token);

    //返回上一页
    wx.navigateBack({delta: 1});    
  }
})