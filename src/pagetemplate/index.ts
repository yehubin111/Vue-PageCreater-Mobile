import Vue from 'vue';
import App from './App.vue';
import router from './router';
import HsModule from '@/packages';
import Plugins from '@/assets/installPlugins';
import { lazyLoad } from '@/assets/common';
import 'vant/lib/toast/style';

Vue.use(Plugins);
Vue.use(HsModule);

// const observer = lazyLoad();

Vue.directive('load', {
    bind(el, binding, vnode) {

    },
    inserted(el, binding, vnode) {
        // observer.observe(el);
    }
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
// new Vue({
//     router,
//     template: '<App/>',
//     components: { App },
// }).$mount('#app');
