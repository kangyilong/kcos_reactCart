const Router = require('koa-router');

const Route = new Router();

const { wantOptionData } = require('../processData/processData');

Route.post('/wantMsg',wantOptionData);

module.exports = Route;
