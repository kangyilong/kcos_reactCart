const Koa = require('koa');
const Path = require('path');
const Static = require('koa-static');
const KoaBody = require('koa-body')();
const Route = require('./router/router');

const App = new Koa();
const main = Static(Path.join(__dirname));

App.use(main);
App.use(KoaBody);

App
  .use(Route.routes())
  .use(Route.allowedMethods());

App.listen(3666, (err) => {
  if(err) {
    throw err;
  }
  console.log('server listen 3666');
});