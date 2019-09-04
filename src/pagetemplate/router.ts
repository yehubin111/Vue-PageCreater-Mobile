// import Vue from 'vue';
import Vue from 'vue/dist/vue.js'
import Router from 'vue-router';

// import index from './components/Index.vue';
import pagetemplate from './components/Template.vue';

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: pagetemplate,
        }
        // {
        //     path: '/',
        //     name: 'index',
        //     component: index,
        //     redirect: () => {
        //         return '/pagetemplate';
        //     },
        //     children: [
        //         {
        //             path: 'pagetemplate/:pageid',
        //             name: 'pagetemplate',
        //             component: pagetemplate,
        //         },
        //     ],
        // },
    ],
});
