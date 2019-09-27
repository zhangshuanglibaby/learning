
/**
 * 统一在request中加入loading的方法
 * 需要在同时发出去去的请求都回来了
 * 再去结束loading  
 */
import regeneratorRuntime from '../../lib/runtime/runtime'
//引入request
import {request} from '../../request/index.js'

Page({
  //页面的初始数据
  data: {
    swiperList : [],    //轮播图数据
    cateList : [],   //导航数据
    floorList : []  //楼层数据
  },

  // 生命周期函数--监听页面加载
  onLoad() {
    this.getSwiperdata()
    this.getCatitems()
    this.getFloordata()
    
    // //显示加载
    // wx.showLoading({
    //   title : '加载中',
    //   mask : true
    // })
  },

  // 获取首页轮播图
 async getSwiperdata() {
  const res = await request({url : '/home/swiperdata'})
      // console.log(res)
      this.setData({
        swiperList : res
  })
},

  //获取首页导航菜单
 async getCatitems() {
  const res = await request({url : '/home/catitems'})
      this.setData({
        cateList : res
      })
  },

  //获取楼层数据
 async getFloordata() {
  const res = await request({url : '/home/floordata'})
      this.setData({
        floorList : res
    })
  }
})