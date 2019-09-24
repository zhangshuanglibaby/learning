// components/YGtabs/index.js
Component({
  //组件的属性列表
  properties: {
    titleList : {
      type : Array,
      value : []
    },
    currentIndex : {
      type : Number,
      value : 0
    }
  },
  
  //组件的方法列表
  methods: {
    handleTap(e) {
      const {index} = e.target.dataset
      //发送给父组件
      this.triggerEvent('sendIndex',{index})
    }
  }
})
