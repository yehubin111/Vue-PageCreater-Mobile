import BannerBox from './src/main.vue';

(BannerBox as any).install = (Vue: any) => {
    Vue.component(BannerBox.name, BannerBox);
};

export default BannerBox;
