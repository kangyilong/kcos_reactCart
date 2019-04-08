const Mysql = require('mysql');
const { _SQLCONFIG } = require('../config');

// 创建数据库连接
const pool = Mysql.createPool(_SQLCONFIG);

const chatTypeMsg = {
  'userLoginChat': '用户加入聊天',
  'userSendMsg': '用户发送信息',
  'userOutChat': '退出聊天室'
};

function queryFn(socket, statements, parameter, chatType, msg = {}) {
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
      if(chatType !== 'userOutChat') {
        socket.emit('send success', {success: result, successCode: chatType});
        socket.broadcast.emit('send success', {success: result, successCode: chatType});
      }else {
        socket.emit('out success', {user_id: msg.user_id, user_nick_name: msg.user_nick_name});
        socket.broadcast.emit('out success', {user_id: msg.user_id, user_nick_name: msg.user_nick_name});
      }
    });
  });
}

module.exports = {
  chatMessage(socket, statements, parameter, chatType, msg) {
    return queryFn(socket, statements, parameter, chatType, msg);
  }
};