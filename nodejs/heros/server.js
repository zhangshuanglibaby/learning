/**
 * 搭建一个基础的服务器
 * 在请求服务事件中,判断访问文件的类型和不同的url路径
 * 下载第三方模块--art-template
 * 利用url模块解析请求方式get的地址
 */
//引入http模块
const http = require('http');
//引入fs模块
const fs = require('fs');
//引入模板引擎
const template = require('art-template');
//移入url模块
const url = require('url');
//创建服务器对象
const server = http.createServer();
//绑定端口和ip
server.listen(8080, () => {
  console.log('可以访问http://127.0.0.1:8080');
});
//注册浏览器请求服务事件
server.on('request', (req, res) => {
  //处理静态的资源
  if (req.url.startsWith('/assets')) {
    if (req.url.endsWith('.css')) {
      //处理css文件的响应头
      res.setHeader('Content-Type', 'text/css');
    }
    //读取静态资源的文件
    fs.readFile('.' + req.url, (err, data) => {
      if (err) console.log(err);
      res.end(data);
    });
  }else {
    //处理动态的资源

    //实现用服务端动态生成结构返回给主页面
    //利用art-template第三方模块
    //约定到url === /views/index.html
    if(req.url === '/views/index.html') {
      //读取data文件里面的json数据
      fs.readFile(__dirname + '/data/heros.json',(err,data) => {
        if(err) console.log(err);
        //把data转成数组
        let arr = JSON.parse(data);
        // console.log(arr);
        //使用模板引擎template(文件路径,对象)
        let html = template(__dirname + '/views/index.html',{arr});
        // //把动态结构返回给服务器
        res.end(html);
      });
      
    }else 
      /**
       * 访问的是添加英雄的页面  约定好url === /views/add.html
       */
      if(req.url === '/views/add.html') {
        //返回静态资源
        fs.readFile('.' + req.url,(err,data) => {
          if(err) console.log(err);
          //把静态资源返回给浏览器
          res.end(data);
        })
      };

    //处理ajax请求的接口
      //约顶好添加英雄的接口是url === /addHero
      /**
       * 由于ajax中的请求方式get,请求地址后面可能会有带参数,这与服务器越好的结构会不同
       * 要利用url模块去解析
       * 此时判断接口是用result.pathname ,result.query返回的是要新增的数据-对象
       */
     let result = url.parse(req.url,true);
     console.log(result)
      if(result.pathname === '/addHero' && req.method === 'GET') {
        //读取jason文件
        fs.readFile(__dirname + '/data/heros.json',(err,data) => {
          if(err) console.log(err);
          //此时要新增的数据没有id
          //解决办法:读取旧数据,获得最大的id,让id+1作为新的数据的id
          let arr = JSON.parse(data);
          let id = 0;
          arr.forEach(e => {
            if(e.id > id) {
              id = e.id
            };
          });
          //result.query返回的是用对象存储新增的数据
          result.query.id = id + 1;
          arr.push(result.query);
          //把数组转成json字符串
          let jsonStr = JSON.stringify(arr);
          //利用fs.writeFile(文件的路径,写入的内容,编译,回调函数)
          fs.writeFile(__dirname + '/data/heros.json',jsonStr,(err) => {
            if(err) console.log(err);
            res.end(JSON.stringify({code : 200, msg : '新增成功'}));
          })
        })
      }
  }

})