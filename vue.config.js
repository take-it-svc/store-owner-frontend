const target = process.env.VUE_APP_NGINX_CLUSTER_IP;

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: 80,
    proxy: {
      '^/': {
        target,
        changeOrigin: true
      }
    },
    disableHostCheck: true,
    // allowedHosts: 'take-it.admin.com',
  }
}
