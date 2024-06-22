export default defineNuxtConfig({
  devtools: { enabled: true },
  watchers: {
    webpack: {
      aggregateTimeout: 300,
    },
  },
  nitro: {
    devServer: {
      watch: ['server', 'pages']
    }
  }
})