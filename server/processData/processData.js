const { wantData } = require('../mysql/mysql');

// ------------------ctx.query获取get请求参数--------------------------------------
// ------------------ctx.request.body获取post请求参数------------------------------
// let data = fs.readFileSync('./k_Mongo/shopList.json', 'utf-8');  读取文件信息
// statements：操作语句
// parameter：操作的数据

let wantOptionData = async(ctx) => { // 处理请求
  let res = ctx.request.body;
  let requestType = res.requestType;
  let statements = res.statements;
  let parameter = res.parameter ? JSON.parse(res.parameter) : null;
  ctx.response.type = 'json';
  await wantData(statements, parameter, requestType).then(data => {
    ctx.body = data;
  }, () => {
    ctx.body = { err: 'error' };
  });
};

module.exports = {
  wantOptionData
};
