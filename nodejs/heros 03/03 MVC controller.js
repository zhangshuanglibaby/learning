/**
 * 这个页面负责处理请求和返回请求
 */

const model = require('./04 MVC model'); 

let controller = {
  //处理主页面请求
  getIndex(req,res) {
    //调用读取数据的方法
    model.readFile((arr) => {
      //使用模板引擎--ejs
      res.render('index',{arr});
    })
  },

  //处理添加页面
  getAddHtml(req,res) {
    //使用模板引擎读取
    res.render('add');
  },

  //处理删除
  deleteHeroById(req,res) {
    //思路是获得当前的点击的删除的id,和读取的json数据的id对比,如果是相同的则删除
    //利用req.query可以获取当前的id
    let id = req.query.id;
    //调用读取数据的方法
    model.readFile((arr) => {
      let index = arr.findIndex(e => {
        return e.id == id;
      });
      arr.splice(index,1);
      //重新写进json文件,调用写入文件方法
      model.writeFile(arr);
      //返回给浏览器
      res.send({code :200, msg : '删除成功'});
    })
  },

  //处理新增
  addNewHero(req,res) {
    //先获取最大的id,让id+1成为新数据的id
    //调用获取最大id的方法
    model.readFile((arr) => {
      model.getMaxId((id) => {
        req.body.id = id + 1;
        arr.push(req.body);
        //调用写入数据方法
        model.writeFile(arr);
        //返回给浏览器
        res.send({code : 200, msg : '新增成功'});
      })
    })
  }
};


module.exports = controller;