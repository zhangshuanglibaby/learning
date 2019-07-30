/**
 * 负责处理读写数据
 */

const fs = require('fs');

let model = {
  //读取数据
  readFile(callback) {
    fs.readFile('./data/heros.json',(err,data) => {
      if(err) console.log(err);
      //转换data
      let arr = JSON.parse(data);
      //需要返回arr的值,要是用回调函数
      callback(arr);
    })
  },

  //写入数据
  writeFile(arr) {
    let content = JSON.stringify(arr);
    fs.writeFile('./data/heros.json',content,'utf-8',(err) => {
      if(err) console.log(err);
    })
  },

  //获取最大id
  getMaxId(callback) {
    this.readFile((arr) => {
      let id = arr[0].id;
      for(let i = 1; i < arr.length; i++) {
        if(arr[i].id > id) {
          id = arr[i].id;
        }
      }
      callback(id);
    })
  }
};

module.exports = model;