/**
 * 1 给输入框绑定 input事件
 *   1 获取输入框的值
 *     1 需要做非空检测
 *   2 把输入框的值发送给后台
 *   3 把返回的数据渲染到页面
 * 
 * 2 在用户输入1s后再发送请求  防抖 防止抖动 （通过定时器来清除上一次的输入）
 */

import regeneratorRuntime from '../../lib/runtime/runtime'
import { request } from '../../request/index'

Page({

  data: {
    searchList: []
  },
  timeId: -1,
  handleInput(e) {
    const { value } = e.detail

    //非空检测
    if(value.trim()) {
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
  }
})