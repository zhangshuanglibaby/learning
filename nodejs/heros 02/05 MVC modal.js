/**
 * 这是数据模型层
 * 负责读取json文件
 * 往json里面存储数据
 */

//引用模块区域
const fs = require('fs');

let modal = {
  gerAllHeros : function(callback) {
    fs.readFile(__dirname + '/data/heros.json',(err,data) => {
      //此时的data是json字符串需转换
      let arr = JSON.parse(data);
      //要把数组返回,因为readFile是异步操作,会等到读取操作完成才执行
      //如果是异步操作,想要得到异步操作的结果,唯一的办法,给一个回调函数
      callback(arr);
    })
  },

  //获取最大id
  getMaxId : function(callback) {
    this.gerAllHeros(function(arr) {
      let id = arr[0].id;
      for(let i = 1; i < arr.length; i++) {
        if(arr[i].id > id) {
          id = arr[i].id;
        }
      }
       //如果是异步操作,想要得到异步操作的结果,唯一的办法,给一个回调函数
       callback(id);
    })
  },

  writeFile : function(arr) {
    let jsonStr = JSON.stringify(arr);
    fs.writeFile(__dirname + '/data/heros.json',jsonStr,'utf-8',(err) => {
      if(err) console.log(err);
    })
  }
};


module.exports = modal;