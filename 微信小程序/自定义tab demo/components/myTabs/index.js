// components/myTabs/index.js
Component({
 
  //组件的属性列表
  properties: {
    currentIndex : {
      type : Number,
      default : 0
    }
  },

  //组件的初始数据
  data: {
    tabList : [
      {id : 0, text : '要闻'},
      {id : 1, text : '推荐'},
      {id : 2, text : '原创'}
    ],
  },

  //组件的方法列表
  methods: {
    handleTap(e) {
      console.log(e)
      let {index} = e.currentTarget.dataset
      this.triggerEvent('sendIndex',{index})
    }
  }
})
