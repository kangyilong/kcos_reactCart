const Router = require('koa-router');

const Route = new Router();

const {
  wantAddData,
  wantDeleData,
  wantExitData,
  wantFindData
} = require('../processData/processData');

Route.get('/h',wantFindData);
// Route.get('/h', wantAddData);
// Route.get('/h', wantDeleData);
// Route.get('/h', wantExitData);

module.exports = Route;