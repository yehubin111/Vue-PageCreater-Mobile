import Vue from 'vue';
import Router from 'vue-router';

import index from './components/Template.vue';
import preview from './components/PreviewFrame.vue';

Vue.use(Router);

const router = new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: index,
        }, {
            path: '/preview',
            name: 'preview',
            component: preview,
        },
    ],
    // routes: [
    //     {
    //         path: '/pagecreater',
    //         name: 'pagecreater',
    //         component: pagecreater,
    //         redirect: () => {
    //             return '/pagecreater/index';
    //         },
    //         children: [
    //             {
    //                 path: 'index',
    //                 name: 'index',
    //                 component: index,
    //             }, {
    //                 path: 'preview',
    //                 name: 'preview',
    //                 component: preview,
    //             },
    //         ],
    //     },
    // ],
});

export default router;
