const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/escalafon',
    createProxyMiddleware({
      target: 'http://localhost',
      changeOrigin: true,
    })
  );
};