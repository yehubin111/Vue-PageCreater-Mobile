import Vue from 'vue';
import Router from 'vue-router';

import index from './components/Template.vue';

Vue.use(Router);

const router =  new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        component: index,
        // redirect: to => {
        //     return '/index';
        // }
    }],
});

export default router;
