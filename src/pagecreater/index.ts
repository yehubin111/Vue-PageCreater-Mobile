import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElmentUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import HsModule from '@/packages';
import Mixins from './mixins';
import Plugins from '@/assets/installPlugins.js';
import { lazyLoad } from '@/assets/common';
import 'vant/lib/toast/style';

Vue.use(Plugins);
Vue.use(ElmentUI);
// 混入初始化获取config
Object.keys(HsModule).forEach(v => {
    if(v != 'install')
        (HsModule as any)[v].mixins = [Mixins];
})
Vue.use(HsModule);

const observer = lazyLoad();

Vue.directive('load', {
    bind(el, binding, vnode) {

    },
    inserted(el, binding, vnode) {
        observer.observe(el);
    }
})

new Vue({
    router,
    store,
    template: '<App/>',
    components: { App },
}).$mount('#app');
