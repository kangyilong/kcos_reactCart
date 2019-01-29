const Mysql = require('mysql');
const { _SQLCONFIG } = require('../config');

// 创建数据库连接
const pool = Mysql.createPool(_SQLCONFIG);

// 通过connection的query方法统一执行增删改查的操作。
function poolFn(connecQuery, statements, parameter, requestType) {
  // getConnection 创建连接池
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        throw err;
        reject('建立连接池失败');
        return;
      }
      connecQuery(connection, statements, parameter, requestType).then(data => {
        connection.release();   // 释放连接
        resolve(data);
      });
    });
    // console.log(pool._allConnections.length); // 连接池里的连接数
  });
}
/*
* connection     连接句柄
* statements     查询语句
* */

// 想要操作的数据
function connecWantData(connection, statements, parameter, requestType) {
  switch(requestType) {
    case 'ALL_SHOP': // 查询所有商品
      break;
  }
  return new Promise((resolve, reject) => {
    connection.query(statements, parameter, (err, result) => {
      if(err) {
        throw err;
        reject('查询失败');
      }
      result.msg = 'ok';
      resolve(result);
    });
  })
}

function queryFn(connecQuery, statements, parameter, requestType) {
  return new Promise((resolve) => {
    poolFn(connecQuery, statements, parameter, requestType).then(data => {
      resolve(data);
    });
  });
}

module.exports = {
  wantData(statements, parameter, requestType) {
    return queryFn(connecWantData, statements, parameter, requestType);
  }
};
