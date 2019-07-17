import ImageGroup from './src/main.vue';

(ImageGroup as any).install = (Vue: any) => {
    Vue.component(ImageGroup.name, ImageGroup);
};

export default ImageGroup;