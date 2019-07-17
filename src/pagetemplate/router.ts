import Vue from 'vue';
import Router from 'vue-router';

import index from './components/Template.vue';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        component: index,
    }],
});
