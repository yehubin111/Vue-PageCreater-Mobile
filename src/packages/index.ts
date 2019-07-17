import Banner from './Banner';
import ImageGroup from './ImageGroup';
import GoodsList from './GoodsList';

const components = [
    Banner,
    ImageGroup,
    GoodsList,
];

const install = (Vue: any, opts = {}): void => {
    components.forEach((component: any) => {
        Vue.component(component.name, component);
    });
};

if (typeof window !== 'undefined' && (window as any).Vue) {
    install((window as any).Vue);
}

export default {
    install,
    Banner,
    ImageGroup,
    GoodsList,
};
