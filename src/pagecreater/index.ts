import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElmentUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import HsModule from '@/packages';


Vue.use(HsModule);
Vue.use(ElmentUI);

new Vue({
    router,
    store,
    template: '<App/>',
    components: { App },
}).$mount('#app');
