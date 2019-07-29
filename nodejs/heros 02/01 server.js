const http = require('http');
const fs = require('fs');
const template = require('art-template');
const querystring = require('querystring');
const server = http.createServer();
server.listen(8080, () => {
  console.log('访问http://127.0.0.1:8080');
});
server.on('request',(req,res) => {
  //处理静态资源
  if(req.url.startsWith('/assets')) {
    //给css文件设置响应头
    if(req.url.endsWith('.css')) {
      res.setHeader('Content-Type','text/css');
    }
    //读取静态资源
    fs.readFile('.' + req.url,(err,data) => {
      if(err) console.log(err);
      res.end(data);
    });
  }else {
    //这里处理动态资源
    
    //处理主页
    if(req.url === '/views/index.html') {
      //读取data的json数据
      fs.readFile(__dirname + '/data/heros.json',(err,data) => {
        //此时的data是json字符串需转换
        let arr = JSON.parse(data);
        //使用第三方模块
        let html = template(__dirname + '/views/index.html',{arr});
        //把结构返回给给浏览器
        res.end(html);
      })
    }else 
    //处理添加英雄静态资源
    if(req.url === '/views/add.html') {
      //读取静态资源
      fs.readFile('./views/add.html',(err,data) => {
        if(err) console.log(err);
        res.end(data);
      })
    }

    //处理ajax新增的请求
    /**
     * 请求方式是post,携带的数据可能比较大需要用到对象正在传送事件和传送完毕事件
     */
    if(req.url === '/addHero' && req.method === 'POST') {
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
        // console.log(data);
        //读取data的json数据
        fs.readFile(__dirname + '/data/heros.json',(err,content) => {
          if(err) console.log(err);
          //把data转成数组
          let arr = JSON.parse(content);
          //获取id
          let id = arr[0].id;
          for(let i = 0; i < arr.length; i++) {
            if(arr[i].id > id){
              id = arr[i].id;
            }
          };
          //由于新增的数据没有id,需要增加id
          data.id = id + 1;
          //把新增的数据加入数组
          arr.push(data);
          console.log(arr);
          //把数组转成json字符串
          let jsonStr = JSON.stringify(arr);
          //写入data的json数据里面
          fs.writeFile(__dirname + '/data/heros.json',jsonStr,'utf-8',(err) => {
            if(err) console.log(err);
            let resulet = {code :200,msg : '新增成功'};
            res.end(JSON.stringify(resulet));
          })
        })

      })
    }
  }
})