const Koa = require('koa');
const Path = require('path');
const Static = require('koa-static');
const KoaBody = require('koa-body')({
    'formLimit':'10mb',
    'jsonLimit':'10mb',
    'textLimit':'10mb',
});
const Route = require('./router/router');
const { chatMessage } = require('./mysql/chat_mysql');
const App = new Koa();
const main = Static(Path.join(__dirname, 'static'));
const interfaces = require('os').networkInterfaces(); // 获取局域网中的本机iP地址

let IPAddress = '';
for(let devName in interfaces){
    let iface = interfaces[devName];
    for(let i=0;i<iface.length;i++){
        let alias = iface[i];
        if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
            IPAddress = alias.address;
        }
    }
}
console.log(IPAddress);

App.use(main);
App.use(KoaBody);
App.use(async (ctx, next) => {
  let CUSTOM_HEADERS = ctx.request.header.authorization;
  if(ctx.request.method.toLowerCase() === 'options' || CUSTOM_HEADERS === 'kcos') {
    const hrefList = ctx.request.header.origin.split(':');
    const PROT = hrefList[hrefList.length - 1];
    ctx.set('Access-Control-Allow-Origin', `http://localhost:${PROT}`);
    ctx.set('Access-Control-Allow-Headers', 'authorization,content-type');
    ctx.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE');
  }
  await next();
});

App
  .use(Route.routes())
  .use(Route.allowedMethods());

const server = require('http').Server(App.callback());

const io = require('socket.io')(server);

const addRecordStatements = `INSERT INTO user_record (user_id,record_code,chat_record,chat_time) values (?,?,?,?)`;
const addChatStatements = `INSERT INTO user_chat (chat_code,user_nick_name,user_hpic,user_level,is_online,user_id) values (?,?,?,?,?,?)`;
const outChatStatements = `UPDATE user_chat SET is_online = '0' WHERE user_id = ?`;

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
  // 退出聊天室
  socket.on('me out socket', (data) => {
    const parameter = [
      data.user_id
    ];
    chatMessage(socket, outChatStatements, parameter, 'userOutChat', data);
  });
});

server.listen(3666, (err) => {
  if(err) {
    throw err;
  }
  console.log('server listen 3666');
});