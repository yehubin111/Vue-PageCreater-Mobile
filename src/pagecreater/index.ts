import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElmentUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import HsModule from '@/packages';
import Filters from '@/packages/filters';
import Mixins from './mixins';
import Plugins from '@/assets/installPlugins';
import { lazyLoad } from '@/assets/common';
// import { Dialog, Toast } from 'vant';
import Dialog from 'vant/lib/dialog';
import 'vant/lib/index.css';

Vue.use(Plugins);
Vue.use(ElmentUI);
Vue.use(Dialog);
// Vue.use(Toast);
// 混入初始化获取config
Object.keys(HsModule).forEach(v => {
    if(v != 'install')
        (HsModule as any)[v].mixins = [Mixins];
})
Vue.use(HsModule);

let observer: any = null;
if(typeof IntersectionObserver != 'undefined')
    observer= lazyLoad();

Vue.directive('load', {
    bind(el, binding, vnode) {

    },
    inserted(el, binding, vnode) {
        if(observer)
            observer.observe(el);
        else {
            let img = el.getAttribute('data-src');
            el.setAttribute('src', img!);
        }
    }
})
// 过滤器
Object.keys(Filters).forEach(key => {
    Vue.filter(key, Filters[key])
})

new Vue({
    router,
    store,
    template: '<App/>',
    components: { App },
}).$mount('#app');
