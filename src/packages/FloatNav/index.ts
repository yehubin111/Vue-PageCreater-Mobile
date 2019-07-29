import FloatNav from './src/main.vue';

(FloatNav as any).install = (Vue: any) => {
    Vue.component(FloatNav.name, FloatNav);
};

export default FloatNav;
