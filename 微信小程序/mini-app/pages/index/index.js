// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList : []
  },

  // 生命周期函数--监听页面加载
  onLoad() {
    this.getSwiperdata()
  },

  // 获取首页轮播图
  getSwiperdata() {
    wx.reqTask = wx.request({
      url: 'https://api.zbztb.cn/api/public/v1/home/swiperdata',
      success: (res) => {
        // console.log(res)
        this.setData({
          swiperList : res.data.message
        })
      }
    }) 
  }
})