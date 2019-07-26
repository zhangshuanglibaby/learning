//搭建服务器的第一步:引入http模块
const http = require('http');
//创建一个服务器
// http.createServer([options],[listeners])--一般都是使用默认值
const server = http.createServer();
//给服务器绑定端口和ip
//server.listen(端口,ip,回调函数)
server.listen(8080,() => {
    console.log('服务器已经开启了,可以通过http://192.168.1.102:8080 访问');
});
//给server注册一个浏览器请求服务事件
//server.on(事件类型,回调函数)
server.on('request',(req,res) => {
    //req是请求对象,res是响应对象
    console.log('有请求进来了');
    //设定响应头可以解决中文乱码问题
    res.setHeader('Content-Type','text/html;charset=utf-8');
    //给浏览器返回一点数据
    res.end('你好,世界');
});