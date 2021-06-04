/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-05-25 22:41:48
 * @LastEditors: wsz
 * @LastEditTime: 2021-06-04 13:14:52
 */
// 这是项目发布阶段用到的babel插件
const prodPlugin = []
if(process.env.NODE_ENV === 'production'){  // 处于产品发布模式
  prodPlugin.push('transform-remove-console')
}
module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    // 发布产品时候的插件数组
    ...prodPlugin,
    "@babel/plugin-syntax-dynamic-import"
  ]
}