import GoodsListOther from './src/main.vue';

(GoodsListOther as any).install = (Vue: any) => {
    Vue.component(GoodsListOther.name, GoodsListOther);
};

export default GoodsListOther;
