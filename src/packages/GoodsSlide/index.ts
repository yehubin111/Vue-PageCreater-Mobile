import GoodsSlide from './src/main.vue';

(GoodsSlide as any).install = (Vue: any) => {
    Vue.component(GoodsSlide.name, GoodsSlide);
};

export default GoodsSlide;
