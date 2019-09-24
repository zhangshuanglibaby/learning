
import {request} from '../../request/index'

Page({
  data : {
    detailList : {} //商品详情数据
  },

  imageList : [],  //图片预览数据

  onLoad(options) {
    this.getDetailList(options.goods_id)
  },

  //获取商品详情数据
  getDetailList(goods_id) {
    request({url : '/goods/detail',data : {goods_id}})
    .then(res => {
      console.log(res)
      const {pics} = res.data.message
      this.imageList = pics.map(v => v.pics_big_url)
      this.setData({
        detailList : res.data.message
      })
    })
  },

  //点击轮播触发预览大图
  handlePreviewImage(e) {
    const {current} = e.currentTarget.dataset
    wx.previewImage({
      current : this.imageList[current],
      urls : this.imageList
    })
  }
})