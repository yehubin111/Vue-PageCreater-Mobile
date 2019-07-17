import Banner from './src/main.vue';

(Banner as any).install = (Vue: any) => {
    Vue.component(Banner.name, Banner);
};

export default Banner;