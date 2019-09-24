// pages/goods_list/index.js
Page({

  //页面的初始数据
  data: {
    //定义传给tab组件的数据
    titleList : [
      {id : 0, text : "综合"},
      {id : 1, text : "销量"},
      {id : 2, text : "价格"}
    ],
    currentIndex : 0  //当前的索引
  },

  //处理切换tablan
  handSendIndex(e) {
    // console.log(e)
    this.setData({
      currentIndex : e.detail.index
    })
  }

})