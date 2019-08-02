/**
 * 搭建服务器
 * 托管静态文件
 * 设置默认模板
 * 注册中间件
 */

//引入用户模块
const router = require('./02-router');

//引入模块
const express = require('express');
const bodyParser = require('body-parser');
//创建app
const app = express();
//绑定端口和ip
app.listen(8080, () => {
  console.log('请访问http://127.0.0.1:8080');
})

//注册托管静态文件中间件
app.use('/assets',express.static('assets'));


//设置默认模板引擎
app.set('view engine','ejs');

//注册body-parser中间件
app.use(bodyParser.urlencoded({extended : false}));

//注册router
app.use(router);
