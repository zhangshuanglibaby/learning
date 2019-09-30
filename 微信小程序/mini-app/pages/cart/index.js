/**
 * 1 如何合理的获取收获地址
 *     0 问题 ： 当用于点击了“取消”,在第二次点击获取地址时,就无法获取了

 *   1 先检查用户的授权 - 获取收获地址的权限状态 auth  -- 通过wx.getSetting
 *   2 auth表示用户曾今给过的权限
 *     1 auth = false 用户点击了取消
 *       1 要诱导用户自己打开授权页面,让用户自己给权限
 *       2 直接获取用户的收获地址
 *     2 auth = true  用户点击了确认
 *     3 auth = undefined ({}) 用户没有点击过取消和确认
 *      当用户满足2、3的状态,直接获取用户的收获地址
 *   3 通过async语法简化代码 -- 封装成promise的形式
 *   4 把收货地址存入到缓存中,（下次打开小程序获取页面时使用）,和data(给页面渲染要用)
 * 
 * 2 在onShow触发
 *   1 获取缓存中的收货地址信息
 *     1 假设有
 *       把按钮隐藏,显示信息
 *     2 假设没有
 *       显示按钮
 * 
 * 3 在onShow触发
 *   1 获取缓存中的购物车数据  动态渲染到页面上
 *     1 回到了商品详情页面 新增一个选中 属性
 * 
 * 4 计算数据 (由于计算需要多次调用,需要封装)
 *   1 全选
 *   2 总价格
 *   3 结算数量
 * 
 * 5 商品的单选功能
 *   1 给复选框绑定 bindchange
 *   2 获取当前选中的状态
 *     1 获取购物车carts数中的元素的checked属性
 *     2 直接取反即可
 *  3 重新赋值
 *  4 重新存储
 *  5 重新计算
 * 
 * 6 商品数量的编辑
 *   1 给数量按钮绑定点击事件
 *     1 给 “ + ” 和 “ - ”按钮都绑定同一个事件并且传参  + => 1  - => -1
 *   2 传递索引参数
 *   3 重新赋值
 *   4 重新计算
 * 
 * 7 商品的数量编辑 -  删除
 *   1 当用户点击“-” 并且数量=1时
 *   2 弹出窗口 询问用户 是否要删除
 *   3 用户点了 “是”
 *   4 用户点了 “否”
 */

import regeneratorRuntime from '../../lib/runtime/runtime'
import { getSetting,openSetting,chooseAddress,showModal } from '../../request/index'

Page({

  data : {
    adress : {},  //存储地址数据
    carts : [],  //购物车数据
    allChecked : false,  //全选状态
    totalPrice : 0,  //总价格
    totalNums : 0  //结算数量
  },

  //监听页面显示
  onShow() {
    //获取缓存中的收获信息
    //此时的adress可能是有对象,可能是空字符串 ,空字符串的布尔是false
    const adress = wx.getStorageSync('adress')

    //获取购物车数据
    const carts = wx.getStorageSync('carts');
      
    //赋值给data
    this.setData({adress,carts})

    //调用计算方法
    this.coundData(carts)
  },

  //点击获取地址按钮触发
  handleGetAddress() {
    //调用获取收获地址方法
    this.getUserAddress()
  },

  //获取收获地址方法
  async getUserAddress() {
    //获取权限
    const res1 = await getSetting()
    const auth = res1.authSetting["scope.address"]
    if(auth === false) {
      //诱导用户打开授权页面
      await openSetting()
      //直接打开用户的收获地址
      // const res2 = await chooseAddress()
      // console.log(res2)
    }else {
      // //直接打开用户的收获地址
      // const res2 = await chooseAddress()
      // console.log(res2)
    }
     const res2 = await chooseAddress()
    //  console.log(res2)
     //添加一个新的属性--详细的地址信息
     res2.detailAdress = res2.cityName + res2.countyName + res2.detailInfo
     //把数据存入缓存
     wx.setStorageSync('adress',res2)
     //赋值给data
     this.setData({
       adress : res2
     })
  },

  //计算数量
  coundData(carts) {
    //只要checked有一个false ,allChecked则为false
    let allChecked = true 
    //总价格是计算checked为true的商品 = 商品价钱 * 商品数量
    let totalPrice = 0
    //结算数量是结算checke为true的商品
    let totalNums = 0

    carts.forEach(v => {
      if(v.checked) {
        totalPrice += v.goods_price * v.num
        totalNums += v.num
      }else {
        allChecked = false
      }
    })

    //细节 ，当没有商品时,取消全选
    allChecked = carts.length === 0 ? false : allChecked

    //重新赋值
    this.setData({allChecked,totalPrice,totalNums})
  },

  //点击复选框触发
  handleItemChange(e) {
    //获取当前索引
    const {index} = e.target.dataset
    //结构当前的购物车数据
    let {carts} = this.data
    //当前的checked属性取反
    carts[index].checked = !carts[index].checked
    //重新赋值
    this.setData({carts})
    //重新存储
    wx.setStorageSync('carts', carts);
    //重新计算
    this.coundData(carts)
  },

  //编辑商品数量
 async handleNum(e) {
    const {index , operation} = e.target.dataset
    let {carts} = this.data

    //检测当前如果点击了-,并且数量为1
  if(operation === -1 && carts[index].num === 1) {
    const res = await showModal({title: '提示',content: '确认要删除该商品吗?'})
    if(res) {
      //点击了确认
      carts.splice(index,1)
    }
  }else {
    carts[index].num += operation
  }       
    //重新赋值
    this.setData({carts})
    //重新存储
    wx.setStorageSync('carts',carts)
    //重新计算
    this.coundData(carts)
  }
})