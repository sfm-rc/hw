const Koa = require('koa');
const logger = require('koa-logger');
const convert = require('koa-convert');
const proxy = require('koa-proxy');
const { API_HOST, CDN } = require('./ecosystem.config')[process.env.ECOSYSTEM || 'prod'];

const app = new Koa();

app.use(logger());
app.use(convert(proxy({
  host: `http://${API_HOST}`,
  match: /^\/api\//,
  jar: true,
})));
app.use(convert(proxy({
  url: `http:${CDN}index.html`,
})));

app.listen(12380, () => {
  console.log(`Ecosystem: ${process.env.ECOSYSTEM}.`);
  console.log('Server running at localhost:12380.');
  console.log(`API Server running at ${API_HOST}.`);
  console.log(`CDN Server running at ${CDN}.`);
});
