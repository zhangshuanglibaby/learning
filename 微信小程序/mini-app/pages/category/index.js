//引入请求方法
import {request} from '../../request/index.js'

/**
 * 给大数据加一个缓存效果
 *  1 在第一次发送请求成功的时候,把数据缓存起来
 *  key : "cates"
 * value : {
 *    data : this.cateData,
 *    time : 当下的时间
 * }
 *  2 在发送请求前先判断有没有旧的数据
 *    1 有旧的数据
 *        1 判断有没有过期
 *            1 已经过期  再次发送请求获取新的数据
 *            2  为过期  才使用旧的数据
 *   2  没有旧的数据  再次发送请求获取新的数据
 */

Page({


  //页面初始化
  data: {
    menuList : [],  //左侧的菜单栏数据
    goodsList : [],  //右侧的商品列表信息
    currentIndex : 0, //存储当前的索引
    scrollTop : 0  //定义滚动条位置
  },
  cateData : [],
  //生命周期函数--监听页面加载
  onLoad() {
    this.loadData()
  },

  //获取缓存数据的方法
  loadData() {
    //获取本地存储的数据  值空 -- 空字符串
    const localCate = wx.getStorageSync('cates');
    if(localCate) {
      //检测有没有过期
      if(Date.now() - localCate.time > 1000*5 ) {
        //重新获取数据
        this.getCate()
      }else {
        //使用旧数据
        this.cateData = localCate.data
        const menuList = this.cateData.map(v => v.cat_name)
        const goodsList = this.cateData[0].children
        this.setData({
          menuList,
          goodsList
        })
      }
    }else {
      //没有旧数据,重新发送新的数据
      this.getCate()
    }
      
  },

  //获取商品分类数据
  getCate() {
    request({url : '/categories'})
    .then(res => {
      // console.log(res)
      this.cateData = res.data.message
      //把数据缓存到本地中
    wx.setStorageSync('cates', {data : this.cateData,time : Date.now()});
       

      const menuList = this.cateData.map(v => v.cat_name)
      const goodsList = this.cateData[0].children
      // console.log(menuList)
      this.setData({
        menuList,
        goodsList
      })
    })
  },

  //点击左侧菜单栏触发
  handleTap(e) {
    // console.log(e)
    const {index} = e.target.dataset
    const goodsList = this.cateData[index].children
    this.setData({
      currentIndex : index,
      goodsList,
      scrollTop : 0  //点击每次菜单栏都使滚动回到顶部
    })
  }
})