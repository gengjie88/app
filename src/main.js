import Vue from 'vue'
import App from './App.vue'
import './assets/style/reset.css' //清除默认样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
    render: h => h(App),
}).$mount('#app')