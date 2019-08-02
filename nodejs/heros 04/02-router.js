/**
 * 负责开接口请求,把请求分下去
 */

 //引入用户模块
const controller = require('./03-controller');
const express = require('express');
const router = express.Router();

//设置主页面接口
router.get('/index.html',(req,res) => {
    //调用处理主页面返回
    controller.getIndex(req,res);
});

//设置添加英雄页面接口
router.get('/add.html',(req,res) => {
    //调用处理添加英雄页面返回
    controller.getAdd(req,res);
});

//设置新增英雄接口
router.post('/addNewHero',(req,res) => {
    //调用新增英雄返回
    controller.addNewHero(req,res);
});

//处理删除英雄接口
router.get('/deleteHeroById',(req,res) => {
    //调用删除英雄返回
    controller.deleteHeroById(req,res);
});

//处理修改页面接口
router.get('/edit.html',(req,res) => {
    //调用修改页面返回
    controller.getEidt(req,res);
});

//处理修改英雄数据接口
router.post('/editHero',(req,res) => {
    //调用处理修改英雄数据返回
    controller.editHero(req,res);
})













module.exports = router;