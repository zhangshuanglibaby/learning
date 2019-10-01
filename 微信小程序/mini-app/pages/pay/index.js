/**
 * 1 在页面数据渲染的时候,要加载的购物车数据应该是 checked属性 = true
 */




import regeneratorRuntime from '../../lib/runtime/runtime'
import { getSetting,openSetting,chooseAddress,showModal,showToast } from '../../request/index'

Page({

  data : {
    adress : {},  //存储地址数据
    carts : [],  //购物车数据
    totalPrice : 0,  //总价格
    totalNums : 0  //结算数量
  },

  //监听页面显示
  onShow() {
    //获取缓存中的收获信息
    //此时的adress可能是有对象,可能是空字符串 ,空字符串的布尔是false
    const adress = wx.getStorageSync('adress')

    //获取购物车数据
    let carts = wx.getStorageSync('carts') || [];

    //赋值前先过滤找出checked = true
     carts = carts.filter(v => v.checked) 
      
    //赋值给data
    this.setData({adress,carts})

    //调用计算方法
    this.coundData(carts)
  },

  //计算数量
  coundData(carts) {
    //总价格是计算checked为true的商品 = 商品价钱 * 商品数量
    let totalPrice = 0
    //结算数量是结算checke为true的商品
    let totalNums = 0

    carts.forEach(v => {
      if(v.checked) {
        totalPrice += v.goods_price * v.num
        totalNums += v.num
      }
    })

    //重新赋值
    this.setData({totalPrice,totalNums})
  }

})