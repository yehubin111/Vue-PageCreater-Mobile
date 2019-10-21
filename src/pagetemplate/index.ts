import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import HsModule from '@/packages';
import Plugins from '@/assets/installPlugins';
import { lazyLoad } from '@/assets/common';
// import { Dialog, Toast } from 'vant';
import Dialog from 'vant/lib/dialog';
import Overlay from 'vant/lib/overlay';
import 'vant/lib/index.css';
 
Vue.use(Plugins);
Vue.use(HsModule);
Vue.use(Dialog);
Vue.use(Overlay);
// Vue.use(Toast);

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

new Vue({
    store,
    router,
    template: '<App/>',
    components: { App },
}).$mount('#app');
