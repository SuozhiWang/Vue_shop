/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-06-04 11:12:02
 * @LastEditors: wsz
 * @LastEditTime: 2021-06-04 11:26:47
 */
module.exports = {
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      //使用externals设置排除项
      config.set('externals',{
        vue:'Vue',
        'vue-router':'VueRouter',
        axios:'axios',
        lodash:'_',
        echarts:'echarts',
        nprogress:'NProgress',
        'vue-quill-editor':'VueQuillEditor'
    })
    })
    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}