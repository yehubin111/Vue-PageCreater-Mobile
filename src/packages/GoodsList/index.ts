import GoodsList from './src/main.vue';

(GoodsList as any).install = (Vue: any) => {
    Vue.component(GoodsList.name, GoodsList);
};

export default GoodsList;
