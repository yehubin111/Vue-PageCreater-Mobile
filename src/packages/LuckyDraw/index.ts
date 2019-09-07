import LuckyDraw from './src/main.vue';

(LuckyDraw as any).install = (Vue: any) => {
    Vue.component(LuckyDraw.name, LuckyDraw);
};

export default LuckyDraw;
