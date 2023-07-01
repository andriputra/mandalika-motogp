const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://apistaging.my-pertamina.id', // Ganti dengan URL server tujuan
			changeOrigin: true,
		})
	);
};
