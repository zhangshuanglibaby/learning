
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
  },

  // 获取首页轮播图
  getSwiperdata() {
    request({url : '/swiperdata'})
    .then(res => {
      // console.log(res)
      this.setData({
        swiperList : res.data.message
      })
    }) 
  },

  //获取首页导航菜单
  getCatitems() {
    request({url : '/catitems'})
    .then(res => {
      this.setData({
        cateList : res.data.message
      })
    })
  },

  //获取楼层数据
  getFloordata() {
    request({url : '/floordata'})
    .then(res => {
      this.setData({
        floorList : res.data.message
      })
    })
  }
})