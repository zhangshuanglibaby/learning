/**
 * 总页数 = Math.ceil(总条数 / 页容量)
 */



import {request} from '../../request/index.js'

Page({

  //页面的初始数据
  data: {
    //定义传给tab组件的数据
    titleList : [
      {id : 0, text : "综合"},
      {id : 1, text : "销量"},
      {id : 2, text : "价格"}
    ],
    currentIndex : 0,  //当前的索引
    goodsList : [],  //商品列表数据
    isShow : false
  },

  //使用全局变量存储发送请求的参数
  goodsObj : {
    query : '',
    cid : '',
    pagenum : 1,
    pagesize : 10
  },

  //定义总页数
  totalPages : 1,

  //处理切换tablan
  handSendIndex(e) {
    // console.log(e)
    this.setData({
      currentIndex : e.detail.index
    })
  },

  onLoad(options) {
    // console.log(options)
    this.goodsObj.cid = options.cid

    this.getGoodsList()
  },

  //获取商品列表数据
  getGoodsList() {
    request({url : '/goods/search',data : this.goodsObj})
    .then(res => {
      console.log(res)
      //需要实现新旧数据结合
      const newGoodsList = res.data.message.goods
      const oldGoodsList = this.data.goodsList

      const {total} = res.data.message
      this.totalPages = Math.ceil(total / this.goodsObj.pagesize)

      this.setData({
        goodsList : [...oldGoodsList,...newGoodsList]
      })

      //数据回来了,关闭下拉动作
      wx.stopPullDownRefresh()
    })
  },

  //页面上拉触发的事件
  onReachBottom() {
    //先判断有没有下一项数据
    if(this.goodsObj.pagenum >= this.totalPages) {
      wx.showToast({
        title : '最后一页了,没有数据了',
        icon : 'none'
      })
      this.setData({
        isShow : true
      })
    }else {
      //让当前页数自增
      this.goodsObj.pagenum++
      this.getGoodsList()
    }
  },

  //监听用户下拉动作
  onPullDownRefresh() {
    //重新刷新数据
    this.goodsObj.pagenum = 1
    this.data.goodsList = []
    this.getGoodsList()
  }

})