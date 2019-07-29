import Vue from 'vue';
import App from './App.vue';
import router from './router';
import HsModule from '@/packages';
import Plugins from '@/assets/installPlugins.js';
import 'vant/lib/toast/style';

Vue.use(Plugins); 
Vue.use(HsModule);

new Vue({
    router,
    template: '<App/>',
    components: { App },
}).$mount('#app');
