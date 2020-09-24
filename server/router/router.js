const Router = require('koa-router');

const Route = new Router();

const {wantOptionData} = require('../processData/processData');

Route.post('/wantMsg', wantOptionData);

Route.get('/w', async (ctx) => {
    ctx.body = 'haha';
});

module.exports = Route;
