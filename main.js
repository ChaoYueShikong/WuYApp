import Vue from 'vue'
import App from './App'
import cuCustom from './components/cu-custom.vue'
import pageHead from './components/page-head.vue'
import global_ from './data/global' //引用文件

Vue.config.productionTip = false


Vue.component('cu-custom', cuCustom)
Vue.component('page-head', pageHead)
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
