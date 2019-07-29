/**
 * 这是业务逻辑层,负责把请求处理了,再把处理返回
 */
//引用模块区域
const fs = require('fs');
const template = require('art-template');
const querystring = require('querystring');
const modal = require('./05 MVC modal');


let controller = {
  //处理静态资源
  getStatic : function(req,res) {
     //给css文件设置响应头
     if(req.url.endsWith('.css')) {
      res.setHeader('Content-Type','text/css');
    }
    //读取静态资源
    fs.readFile('.' + req.url,(err,data) => {
      if(err) console.log(err);
      res.end(data);
    });
  },

  //处理主页资源
  getIndexHtml : function(req,res) {
    modal.gerAllHeros(function(arr) {
      //使用第三方模块
      let html = template(__dirname + '/views/index.html',{arr});
      //把结构返回给给浏览器
      res.end(html);
    })
  },

  //处理添加页面
  getAddHtml : function(req,res) {
     //读取静态资源
     fs.readFile('./views/add.html',(err,data) => {
      if(err) console.log(err);
      res.end(data);
    })
  },

  //处理添加英雄
  getAddHero : function(req,res) {
    let data = '';
      //监听req对象的正在传送事件
      //数据是一块一块传上去的,有个事件对象chunck-块
      req.on('data',(chunck) => {
        //把每次传送出去的数据累加
        data += chunck;
      });
      //监听req对象传送完毕事件
      req.on('end',() => {
        // console.log(data); //此时的data是url编码的格式
        //用一个核心模块queryString解析成对象
        data = querystring.parse(data); //data是ajax请求新增的数据
        modal.gerAllHeros(function(arr) {
          modal.getMaxId(function(id) {
            data.id = id + 1;
            arr.push(data);
            modal.writeFile(arr);
            let resulet = {code : 200,msg :'成功'};
            res.end(JSON.stringify(resulet));
          })
        })

      })
  }

};


module.exports = controller;