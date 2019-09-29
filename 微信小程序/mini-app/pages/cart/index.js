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
 * */

import regeneratorRuntime from '../../lib/runtime/runtime'
import { getSetting,openSetting,chooseAddress } from '../../request/index'

Page({

  data : {
    adress : {}  //存储地址数据
  },

  //监听页面显示
  onShow() {
    //获取缓存中的收获信息
    //此时的adress可能是有对象,可能是空字符串 ,空字符串的布尔是false
    const adress = wx.getStorageSync('adress')
    //赋值给data
    this.setData({
      adress
    })
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
  }
})