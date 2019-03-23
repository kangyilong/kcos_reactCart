const Koa = require('koa');
const Path = require('path');
const Static = require('koa-static');
const KoaBody = require('koa-body')();
const Route = require('./router/router');
const { chatMessage } = require('./mysql/chat_mysql');
const App = new Koa();
const main = Static(Path.join(__dirname));

App.use(main);
App.use(KoaBody);

App
  .use(Route.routes())
  .use(Route.allowedMethods());

const server = require('http').Server(App.callback());

const io = require('socket.io')(server);

const addRecordStatements = `INSERT INTO user_record (user_id,record_code,chat_record,chat_time) values (?,?,?,?)`;
const addChatStatements = `INSERT INTO user_chat (chat_code,user_nick_name,user_hpic,user_level,is_online,user_id) values (?,?,?,?,?,?)`;

io.on('connection', function (socket) {
  socket.on('welcome to me', (data) => {
    socket.emit('welcome to you', {msg: data.msg});
    socket.broadcast.emit('welcome to you', {msg: data.msg});
  });
  socket.on('user msg', function (data) {
    // 将用户加入聊天组
    const {user_nick_name, user_hpic, user_level, user_id} = data.userMsg;
    const chat_code = `kcos_${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
    const parameter = [
      chat_code,
      user_nick_name,
      user_hpic,
      user_level,
      '1',
      user_id
    ];
    chatMessage(socket, addChatStatements, parameter, 'userLoginChat');
  });
  socket.on('send user msg', (data) => {
    const record_code = `kcos_${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
    const parameter = [
      data.user_id,
      record_code,
      data.chatMsg,
      data.chat_time
    ];
    chatMessage(socket, addRecordStatements, parameter, 'userSendMsg');
  });
});

server.listen(3666, (err) => {
  if(err) {
    throw err;
  }
  console.log('server listen 3666');
});