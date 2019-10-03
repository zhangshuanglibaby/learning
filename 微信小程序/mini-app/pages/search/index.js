/**
 * 1 给输入框绑定 input事件
 *   1 获取输入框的值
 *     1 需要做非空检测
 *   2 把输入框的值发送给后台
 *   3 把返回的数据渲染到页面
 * 
 * 2 在用户输入1s后再发送请求  防抖 防止抖动 （通过定时器来清除上一次的输入）
 * 
 * 3 点击取消按钮
 *   1 隐藏按钮
 *   2 清除 数组数据
 *   3 清除 输入框的值
 * 
 * 4 点击超链接 跳转到详情页面
 */

import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index'

Page({

  data: {
    searchList: [],
    isShow : false, // 控制按钮显示
    inputVal : ''  //控制输入框内容
  },
  timeId: -1,
  handleInput(e) {
    const { value } = e.detail

    //非空检测
    if(value.trim()) {
      this.setData({isShow : true})
       //清除上一次的定时器
    clearTimeout(this.timeId)
    this.timeId = setTimeout(() => {
      this.getSearchList(value)
    }, 1000)
    }

  },

  //获取搜索内容
  async getSearchList(value) {
    const res = await request({url: '/goods/qsearch', data: { query: value}})
    console.log(res)
    this.setData({
      searchList: res
    })
  },

  //点击取消触发
  handleCancel() {
    this.setData({
      isShow :false,
      searchList : [],
      inputVal : ''
    })

  }
})