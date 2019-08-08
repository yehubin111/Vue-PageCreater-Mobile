import GoodsTest from './src/main.vue';

(GoodsTest as any).install = (Vue: any) => {
    Vue.component(GoodsTest.name, GoodsTest);
};

export default GoodsTest;
