import Vue from 'vue';
import App from './App.vue';
import router from './router';
import HsModule from '@/packages';

Vue.use(HsModule);

new Vue({
    router,
    template: '<App/>',
    components: { App },
}).$mount('#app');
