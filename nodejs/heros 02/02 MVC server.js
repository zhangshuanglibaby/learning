/**
 * 负责开启服务器
 */

const http = require('http');
const server = http.createServer();
const router = require('./03 MVC router');

server.listen(8080, () => {
  console.log('访问http://127.0.0.1:8080');
});
server.on('request',(req,res) => {
 router(req,res);
});