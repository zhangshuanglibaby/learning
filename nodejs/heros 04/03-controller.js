//负责处理接口请求和返回结果


//引入用户模块
const model = require('./04-model');
const controller = {
  getIndex,
  getAdd,
  addNewHero,
  deleteHeroById,
  getEidt,
  editHero
};


//处理主页面接口
function getIndex(req, res) {
  //调用读取数据库的方法
  model.getAllData(arr => {
    //使用渲染模板的方法
    res.render('index', { arr })
  })
};

//处理添加英雄页面请求
function getAdd(req,res) {
  //使用渲染模板的方法
  res.render('add');
};

//处理新增英雄请求
function addNewHero(req,res) {
  //利用req.body获取post的数据
  //调用新增数据的方法
  model.addNewHero(req.body,result => {
    let response = {
      code : 500,
      msg : '添加失败'
    }
    if(result.affectedRows === 1) {
      response.code = 200;
      response.msg = '添加成功';
    }
    //返回给浏览器
    res.send(response);
  })
};

//处理删除英雄接口请求
function deleteHeroById(req,res) {
  //利用req.query获取get的数据
  //调用删除数据的方法
  model.deleteHeroById(req.query.id,result => {
    let response = {
      code : 500,
      msg : '删除失败'
    }
    if(result.affectedRows === 1) {
      response.code = 200;
      response.msg = '删除成功';
    }
    //返回给浏览器
    res.send(response);
  })
};

//处理修改页面接口请求
function getEidt(req,res) {
  //调用查找对应英雄数据的方法
  model.getHeroData(req.query.id,result => {
    res.render('edit',result);
  })
};

//处理修改英雄数据请求
function editHero(req,res) {
  //调用修改数据的方法
  model.editHero(req.body.id,req.body,result => {
    let response = {
      code : 500,
      msg : '修改失败'
    };
    if(result.affectedRows === 1) {
      response.code = 200;
      response.msg = '修改成功';
    };
    //返回给浏览器
    res.send(response);
  })
}


module.exports = controller;