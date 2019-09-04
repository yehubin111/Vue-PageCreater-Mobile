import Vue from 'vue';
import Router from 'vue-router';

import pagetemplate from './components/Index.vue';
import index from './components/Template.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/',
        //     name: 'index',
        //     component: index,
        // },
        {
            path: '/',
            name: 'index',
            component: pagetemplate,
            redirect: () => {
                return '/pagetemplate';
            },
            children: [
                {
                    path: 'pagetemplate/:pageid',
                    name: 'pagetemplate',
                    component: index,
                },
            ],
        },
        // {
        //     path: '/pagetemplate/:pageid',
        //     name: 'pagetemplate',
        //     component: index,
        // },
    ],
});
