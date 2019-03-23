const Mysql = require('mysql');
const { _SQLCONFIG } = require('../config');

// 创建数据库连接
const pool = Mysql.createPool(_SQLCONFIG);

const chatTypeMsg = {
  'userLoginChat': '用户加入聊天',
  'userSendMsg': '用户发送信息'
};

function queryFn(socket, statements, parameter, chatType) {
  pool.getConnection((err, connection) => {
    if(err) {
      throw err;
      reject('建立连接池失败');
      return;
    }
    connection.query(statements, parameter, (err, result) => {
      if(err) {
        throw err;
        socket.emit('send error', {errorMsg: `${chatTypeMsg[chatType]}失败`});
      }
      socket.emit('send success', {success: result, successCode: chatType});
      socket.broadcast.emit('send success', {success: result, successCode: chatType});
    });
  });
}

module.exports = {
  chatMessage(socket, statements, parameter, chatType) {
    return queryFn(socket, statements, parameter, chatType);
  }
};