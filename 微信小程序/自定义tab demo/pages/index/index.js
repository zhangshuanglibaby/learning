//index.js
//获取应用实例
const app = getApp()

Page({
  data : {
    index : 0
  },

  handleSendIndex(e) {
    // console.log(e)
    this.setData({
      index : e.detail.index
    })
  }
})