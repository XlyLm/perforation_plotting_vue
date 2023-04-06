const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        electronDownload: {
          mirror: "https://npm.taobao.org/mirrors/electron/"
        }
      }
    }
  }
})
