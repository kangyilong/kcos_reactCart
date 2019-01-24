const {
  findData,
  addData,
  deleData,
  exitData
} = require('../mysql/mysql');

// ------------------ctx.query获取get请求参数--------------------------------------
// ------------------ctx.request.body获取post请求参数------------------------------
// let data = fs.readFileSync('./k_Mongo/shopList.json', 'utf-8');  读取文件信息
// statements：操作语句
// parameter：操作的数据

let wantFindData = async(ctx) => { // 获取数据
  let res = ctx.query;
  ctx.response.type = 'json';
  let statements = res.statements;
  let parameter = null;
  if(res.parameter) {
    parameter = JSON.parse(res.parameter);
  }
  await findData(statements, parameter).then(data => {
    ctx.body = data;
  }, () => {
    ctx.body = { err: '数据获取失败' };
  });
};

let wantAddData = async(ctx) => { // 添加数据
  let res = ctx.request.body;
  let statements = res.statements;
  let parameter = JSON.parse(res.parameter);
  ctx.response.type = 'json';
  await addData(statements, parameter).then(data => {
    ctx.body = data;
  }, () => {
    ctx.body = { err: '数据添加失败' };
  });
};

let wantDeleData = async(ctx) => { // 删除数据
  let res = ctx.query;
  let statements = res.statements;
  let parameter = null;
  if(res.parameter) {
    parameter = JSON.parse(res.parameter);
  }
  ctx.response.type = 'json';
  await deleData(statements, parameter).then(data => {
    ctx.body = data;
  }, () => {
    ctx.body = { err: '数据删除失败' };
  });
};

let wantExitData = async(ctx) => { // 修改数据
  let res = ctx.request.body;
  let parameter = JSON.parse(res.parameter);
  let statements = res.statements;
  ctx.response.type = 'json';
  await exitData(statements, parameter).then(data => {
    ctx.body = data;
  }, () => {
    ctx.body = { err: '数据修改失败' };
  });
};

module.exports = {
  wantFindData,
  wantAddData,
  wantDeleData,
  wantExitData
};
