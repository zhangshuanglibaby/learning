/**
 * 这个js文件是路由层,
 * 负责判断请求,把请求发给不同的控制器
 */

//引用模块区域
const controller = require('./04 MVC controller');


/**
 * 
 * @param {obj} req 请求对象
 * @param {obj} res 请求对象
 */
let router = function (req,res) {
   //处理静态资源
   if(req.url.startsWith('/assets')) {
    controller.getStatic(req,res);

  }else {
    //这里处理动态资源
    
    //处理主页
    if(req.url === '/views/index.html') {
      controller.getIndexHtml(req,res);
    }else 
    //处理添加英雄静态资源
    if(req.url === '/views/add.html') {
      controller.getAddHtml(req,res);
    }

    //处理ajax新增的请求
    /**
     * 请求方式是post,携带的数据可能比较大需要用到对象正在传送事件和传送完毕事件
     */
    if(req.url === '/addHero' && req.method === 'POST') {
      controller.getAddHero(req,res);
    }
  }
}

module.exports = router;