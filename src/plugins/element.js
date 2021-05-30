/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-05-29 20:18:43
 * @LastEditors: wsz
 * @LastEditTime: 2021-05-30 15:32:27
 */
import Vue from 'vue'
import { Button } from 'element-ui'
import {Form,FormItem} from 'element-ui'
import {Input} from 'element-ui'
// 导入弹框提示组件
import {Message} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
// 需要将Message全局挂在
Vue.prototype.$message = Message