/**
 * 1  点击轮播图  切换大图预览
 *      1绑定点击事件 
 *      2 调用wx.previewImage的方法
 * 
 * 2  点击加入购物车
 *    1通过本地存储来实现缓存数据
 *    2先解决要存下去的数据的格式 --- 数组对象
 *   [
 *     {
 *      商品id,
 *      商品名称,
 *      商品价钱,
 *      商品图片,
 *      商品数量 
 *     }
 * ]
 * 
 * 3点击加入购物车
 *    1  先获取本地存储的数据,要么有数据否则给个空数组
 *      let cartList = wx.getSroageSync('carts') || []
 *    2判断当前的加入的商品在cartList中是否已经存在---使用findIndex
 *        1 如果没有  则代表第一次购买
 *            把对象push到cartList,商品数量为1
 *        2 如果有  获取到已经存在的商品使商品数量++  cartList[index]
 *        
 *        3  要把数据重新设置给本地存储
 * 
 *        4  使用wx.showToast提示加入购物车成功
 * 
 */

import {request} from '../../request/index'

Page({
  data : {
    detailList : {} //商品详情数据
  },

  onLoad(options) {
    this.getDetailList(options.goods_id)
  },

  //获取商品详情数据
  getDetailList(goods_id) {
    request({url : '/goods/detail',data : {goods_id}})
    .then(res => {
      console.log(res)
      this.setData({
        detailList : res.data.message
      })
    })
  },

  //点击轮播触发预览大图
  handlePreviewImage(e) {
    // console.log(e)
    const {current} = e.currentTarget.dataset
    const {detailList} = this.data
    const urls = detailList.pics.map(v => v.pics_mid_url)
    wx.previewImage({
      current ,
      urls 
    })
  },

  //加入购物车
  handleAppCart() {
    //获取本地的数据
    let cartList = wx.getStorageSync('carts') || [];

    const {detailList} = this.data

    const index = cartList.findIndex(v => v.goods_id === detailList.goods_id)

    if(index === -1) {
      //找不到,新增
      cartList.push({
        goods_id  : detailList.goods_id,
        goods_name : detailList.goods_name,
        goods_price : detailList.goods_price,
        goods_small_logo : detailList.goods_small_logo,
        num : 1
      })
    }else {
      cartList[index].num++
    }

    //把数据存进本地
    wx.setStorageSync('carts',cartList)

    wx.showToast({
      title : '加入购物成功',
      icon : 'success',
      mask : true
    })
  }
})