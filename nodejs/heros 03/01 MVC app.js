/**
 * 这个页面负责开发服务器
 */

const bodyParser = require('body-parser');
const router = require('./02 MVC router');
const express = require('express');
const app = express();
app.listen(8080,() => {
    console.log('访问http://127.0.0.1:8080')
})
//处理静态资源
app.use('/assets',express.static('assets'));

//注册body-parser中间件 --可以解析post请求的数据--url编码
app.use(bodyParser.urlencoded({extended : false}));

//设置引擎模板
app.set('view engine','ejs');

//监听路由
app.use(router);