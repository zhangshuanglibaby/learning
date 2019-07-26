//引入http模块
const http = require('http');
//引入fs模块
const fs = require('fs');
//创建服务器对象
const server = http.createServer();
//绑定端口和ip
server.listen(8080, () => {
  console.log('服务器已经开启了,可以通过http://192.168.1.102:8080 访问');
})
//注册浏览器请求服务事件
server.on('request', (req, res) => {
  //判断请求的url,不同的url返回不同的静态资源
  if (req.url.startsWith('/assets') || req.url.startsWith('/views')) {
    if (req.url.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css')
    }
    if(req.url.endsWith('.js')) {
      res.setHeader('Content-Type','application/javascript');
    }
    if(req.url.endsWith('.jpg')) {
      res.setHeader('Content-Type','image/jpg');
    }
    fs.readFile('.' + req.url, (err, data) => {
      if (err) throw err;
      res.end(data);
    })
  }
})