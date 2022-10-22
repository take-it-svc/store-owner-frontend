const target = process.env.VUE_APP_OWNER_API_GATEWAY_URL;

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 8081,
    proxy: {
      '/user-service': {
        target,
        changeOrigin: true
      },
      '/notification-service': {
        target,
        changeOrigin: true
      },
      '/store-service': {
        target,
        changeOrigin: true
      },
      '/order-service': {
        target,
        changeOrigin: true
      },
    },
    disableHostCheck: true,
    // allowedHosts: 'take-it.admin.com',
  }
}
