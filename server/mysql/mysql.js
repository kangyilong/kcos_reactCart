const Mysql = require('mysql');
const { _SQLCONFIG } = require('../config');

// 创建数据库连接
const pool = Mysql.createPool(_SQLCONFIG);

// 通过connection的query方法统一执行增删改查的操作。
function poolFn(connecQuery, statements, parameter) {
  // getConnection 创建连接池
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if(err) {
        throw err;
        reject('建立连接池失败');
        return;
      }
      connecQuery(connection, statements, parameter).then(data => {
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

// 查询数据
function connecQueryFind(connection, statements, parameter) {
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

// 添加数据
function connecQueryAdd(connection, statements, parameter) {
  return new Promise((resolve, reject) => {
    connection.query(statements, parameter, (err, result) => {
      if(err) {
        throw err;
        reject('添加失败');
      }
      result.msg = 'ok';
      resolve(result);
    });
  })
}

// 删除数据
function connecQueryDele(connection, statements, parameter) {
  return new Promise((resolve, reject) => {
    connection.query(statements, parameter, (err, result) => {
      if(err) {
        throw err;
        reject('删除失败');
      }
      result.msg = 'ok';
      resolve(result);
    });
  })
}

// 修改数据
function connecQueryExit(connection, statements, parameter) {
  return new Promise((resolve, reject) => {
    connection.query(statements, parameter, (err, result) => {
      if(err) {
        throw err;
        reject('修改失败');
      }
      result.msg = 'ok';
      resolve(result);
    });
  })
}

function queryFn(connecQuery, statements, parameter) {
  return new Promise((resolve) => {
    poolFn(connecQuery, statements, parameter).then(data => {
      resolve(data);
    });
  });
}

module.exports = {
  findData(statements, parameter) {
    return queryFn(connecQueryFind, statements, parameter);
  },
  addData(statements, parameter) {
    return queryFn(connecQueryAdd, statements, parameter);
  },
  deleData(statements, parameter) {
    return queryFn(connecQueryDele, statements, parameter);
  },
  exitData(statements, parameter) {
    return queryFn(connecQueryExit, statements, parameter);
  }
};
