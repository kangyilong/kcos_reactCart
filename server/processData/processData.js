const {
  findData,
  addData,
  deleData,
  exitData
} = require('../mysql/mysql');

// ------------------ctx.query获取get请求参数--------------------------------------
// ------------------ctx.request.body获取post请求参数------------------------------
// let data = fs.readFileSync('./k_Mongo/shopList.json', 'utf-8');  读取文件信息

let wantFindData = async(ctx) => { // 获取数据
  // let type = ctx.request.body.type;
  ctx.response.type = 'json';
  await findData().then(data => {
    ctx.body = data;
  });
};

let wantAddData = async(ctx) => { // 添加数据
  // let type = ctx.request.body.type;
  ctx.response.type = 'json';
  await findData().then(data => {
    ctx.body = data;
  });
};

let wantDeleData = async(ctx) => { // 删除数据
  // let type = ctx.request.body.type;
  ctx.response.type = 'json';
  await findData().then(data => {
    ctx.body = data;
  });
};

let wantExitData = async(ctx) => { // 修改数据
  // let type = ctx.request.body.type;
  ctx.response.type = 'json';
  await findData().then(data => {
    ctx.body = data;
  });
};

module.exports = {
  wantFindData,
  wantAddData,
  wantDeleData,
  wantExitData
};
