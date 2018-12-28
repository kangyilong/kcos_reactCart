const Router = require('koa-router');

const Route = new Router();

const {
  wantAddData,
  wantDeleData,
  wantExitData,
  wantFindData
} = require('../processData/processData');

Route.post('/add',wantAddData);
Route.get('/getShopMsg', wantFindData);
Route.post('/exitShopMsg', wantExitData);
Route.get('/delete', wantDeleData);

module.exports = Route;
