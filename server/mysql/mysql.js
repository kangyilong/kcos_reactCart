const Mysql = require('mysql');

const pool = Mysql.createPool({ // 创建连接池
  host: 'localhost',
  user: 'root',
  port: '3306',
  database: 'kcos',
  password: 'kyl666666',
  connectionLimit: 50  // 最大连接数
});

// 通过connection的query方法统一执行增删改查的操作。
function poolFn(connecQuery) {
  // getConnection 创建连接池
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        throw err;
        reject('建立连接池失败');
        return;
      }
      connecQuery(connection).then(data => {
        connection.release();   // 释放连接
        resolve(data);
      });
    });
    console.log(pool._allConnections.length); // 连接池里的连接数
  });
}

// 查询数据
function connecQueryFind(connection) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM userMsg', (err, result) => {
      if(err) {
        throw err;
        reject('查询失败');
      }
      resolve(result);
    });
  })
}

// 添加数据
function connecQueryAdd(connection) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM userMsg', (err, result) => {
      if(err) {
        throw err;
        reject('查询失败');
      }
      resolve(result);
    });
  })
}

// 删除数据
function connecQueryDele(connection) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM userMsg', (err, result) => {
      if(err) {
        throw err;
        reject('查询失败');
      }
      resolve(result);
    });
  })
}

// 修改数据
function connecQueryExit(connection) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM userMsg', (err, result) => {
      if(err) {
        throw err;
        reject('查询失败');
      }
      resolve(result);
    });
  })
}

function queryFn(connecQuery) {
  return new Promise((resolve) => {
    poolFn(connecQuery).then(data => {
      resolve(data);
    });
  });
}

module.exports = {
  findData() {
    return queryFn(connecQueryFind);
  },
  addData() {
    return queryFn(connecQueryAdd);
  },
  deleData() {
    return queryFn(connecQueryDele);
  },
  exitData() {
    return queryFn(connecQueryExit);
  }
};


