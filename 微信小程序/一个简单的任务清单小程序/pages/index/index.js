//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    cityList: [{
        id: 0,
        city: "中国"
      },
      {
        id: 1,
        city: "美国"
      },
      {
        id: 2,
        city: "英国"
      }
    ],
    inputVal: ''
  },

  handleInput(e) {
    // console.log(e)
    this.setData({
      inputVal: e.detail.value
    })
  },
  handleTap() {
    const {
      cityList,
      inputVal
    } = this.data
    // 添加需要去重
    const index = cityList.findIndex(v => v.city === inputVal)
    // console.log(index)
    if (index === -1) {
      cityList.push({
        id: Date.now(),
        city: inputVal
      })
    }
    // 重新赋值
    this.setData({
      cityList
    })
  },

  handleDelete(e) {
    const {index} = e.target.dataset
    const {cityList} = this.data
    cityList.splice(index,1)
    this.setData({
      cityList
    })
  }
})