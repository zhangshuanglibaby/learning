/**
 * 1  处理切换tab栏
 * 2  获取商品列表数据
 * 3  页面触发上拉的事件
 *    1 需要通过总页数判断有没有一项 -- 总页数 = Math.ceil((总数 / 页容量))
 *        当当前页大于总页数则显示没有数据了
 *        否则让当前页数自增,重新调用获取数据
 * 
 * 4  监听用户下拉动作  需要让页数回归1  数组清空
 *    在数据回来的时候,停止当前页面下拉刷新
 * 
 */



import regeneratorRuntime from '../../lib/runtime/runtime'
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
 async getGoodsList() {
  const res = await request({url : '/goods/search',data : this.goodsObj})
      // console.log(res)
      //需要实现新旧数据结合
      const newGoodsList = res.goods
      const oldGoodsList = this.data.goodsList

      const {total} = res
      this.totalPages = Math.ceil(total / this.goodsObj.pagesize)

      this.setData({
        goodsList : [...oldGoodsList,...newGoodsList]
      })
      //数据回来了,关闭下拉动作
      wx.stopPullDownRefresh()
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