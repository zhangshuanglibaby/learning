//处理数据库的增删该查

//引入mysql
const mysql = require('mysql');

//创建连接对象
let conn = mysql.createConnection({
  host : '127.0.0.1',
  port : 3306,
  user : 'root',
  password : 'root',
  database : 'heros case'
})


module.exports = {
  //读取所有数据
  getAllData(callback) {
    let sql = `SELECT * FROM heros WHERE isDelete = 0`;
    conn.query(sql,(err,result) => {
      if(err) console.log(err);
      //返回结果 -- 是数组
      callback(result);
    })
  },

  //新增数据--参数是根据post请求的数据
  addNewHero(data,callback) {
    let sql = `INSERT INTO heros set \`name\` = '${data.name}',\`gender\` = '${data.gender}',
    \`img\` = '${data.img}'`;
    conn.query(sql,(err,result) => {
      if(err) console.log(err);
      //返回结果 --- 是对象
      callback(result);
    });
  },

  //删除数据 - 参数是根据get请求的id
  deleteHeroById(id,callback) {
    let sql = `DELETE FROM heros WHERE id = ${id}`;
    conn.query(sql,(err,result) => {
      if(err) console.log(err);
      //返回结果 - 对象
      callback(result);
    })
  },

  //查找对应的数据 -- 参数是对应的id
  getHeroData(id,callback) {
    let sql = `SELECT * FROM heros WHERE id = ${id}`;
    conn.query(sql,(err,result) => {
      if(err) console.log(err);
      callback(result[0]);//此时的result是数组
    })
  },

  //修改数据 - 参数是对应的id,post的数据
  editHero(id,data,callback) {
    let sql = `UPDATE heros set \`name\` = '${data.name}',\`gender\` = '${data.gender}',\`img\` = '${data.img}'
     WHERE id = ${id}`;
     conn.query(sql,(err,result) => {
       if(err) console.log(err);
       callback(result);
     })
  }
}