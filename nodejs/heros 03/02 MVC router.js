/**
 * 这个页面负责分发请求
 */

const controller = require('./03 MVC controller');
const express = require('express');
const router = express.Router();

//处理主页面
router.get('/index.html',(req,res) => {
    //调用处理主页面的返回
    controller.getIndex(req,res);
});

//处理添加页面
router.get('/add.html',(req,res) => {
    //调用处理添加页面的返回
    controller.getAddHtml(req,res);
});

//处理删除操作
router.get('/deleteHeroById',(req,res) => {
    //调用处理删除的返回
    controller.deleteHeroById(req,res);

});

//处理新增
router.post('/addNewHero',(req,res) => {
    //调用处理新增的返回
    controller.addNewHero(req,res);
})








module.exports = router;