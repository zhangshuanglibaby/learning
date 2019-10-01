/**
 * 1 在页面数据渲染的时候,要加载的购物车数据应该是 checked属性 = true
 * 2 当用户点击“结算”按钮
 *   1 绑定点击事件
 * 3 点击支付时,判断缓存中没有token
 *   1 没有token 跳转页面到授权页面
 *   2 有token 继续往下执行
 * 
 * 4 创建订单
 *   1 根据接口要求构成参数
 *     1 请求头的token
 *     2 请求体中的参数
 * 
 * 5 获取支付参数  - 通过请求
 * 6 发起微信支付 - 通过内置的支付api wx.requestPayment
 * 7 查询订单支付状态
 *   1 弹窗提示 支付成功
 *   2 删除已经支付成功的购物车数据
 *     1 获取缓存中的购物车数据
 *     2 筛选出checked属性为false的商品即可
 * 8 跳转到订单页面
 */




import regeneratorRuntime from '../../lib/runtime/runtime'
import { request ,requestPayment,showToast} from '../../request/index'

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
  },

  //点击支付
  handleOrderPay() {

    //调用执行创建订单的逻辑
    this.createdOrder()
    
   
},

//执行创建订单的逻辑
 async createdOrder() {
     //读取缓存中的token - 检测
     const token = wx.getStorageSync('token')
     if(!token) {
      //跳转到授权页面
       wx.navigateTo({ url: '/pages/auth/index'});
       return;
    }

    const {totalPrice,adress,carts} = this.data
    //构成参数
    //#region 构成参数逻辑
    const order_price = totalPrice  //订单总价格
    const consignee_addr = adress.detailAdress  //收获地址
    const goods = carts.map(v => {
      return {
        goods_id : v.goods_id,
        goods_number : v.num,
        goods_price : v.goods_price
      }
    })
    //#endregion
    const orderParmas = {order_price,consignee_addr,goods}
    
    //获取订单编号
    const {order_number} = await request({url : '/my/orders/create',method :'post',data : orderParmas})
    
    //获取支付参数
    const {pay} = await request({url : '/my/orders/req_unifiedorder',method :'post',data : {order_number}})
    
    //发起微信支付
    await requestPayment(pay)
    
    //查询支付订单状态
    const msg = await request({url : '/my/orders/chkOrder',method :'post',data : {order_number}})
    
    //弹窗提示
    await showToast({title : msg,mask: true})

    //删除已经成功支付的购物车数据
    //获取缓存中的购物车数据
    let localCarts = wx.getStorageSync('carts')
    //筛选出checked为false的商品
    wx.setStorageSync('carts',localCarts.filter(v => !v.checked))

    //跳转页面
    wx.navigateTo({url : '/pages/order/index'})
    
  }
})