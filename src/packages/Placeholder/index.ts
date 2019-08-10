import Placeholder from './src/main.vue';

(Placeholder as any).install = (Vue: any) => {
    Vue.component(Placeholder.name, Placeholder);
};

export default Placeholder;