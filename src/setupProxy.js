const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://apistaging.my-pertamina.id', // Ganti URL ini dengan URL server API Anda
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '', // Jika API Anda memiliki awalan tertentu, ubah sesuai kebutuhan
      },
      headers: {
        'Origin': 'http://localhost:3000/',
      },
    })
  );
};
