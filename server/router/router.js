const Router = require('koa-router');

const Route = new Router();

const {
  wantAddData,
  wantDeleData,
  wantExitData,
  wantFindData
} = require('../processData/processData');

Route.post('/addMsg',wantAddData);
Route.get('/getMsg', wantFindData);
Route.post('/exitMsg', wantExitData);
Route.get('/delMsg', wantDeleData);

module.exports = Route;
