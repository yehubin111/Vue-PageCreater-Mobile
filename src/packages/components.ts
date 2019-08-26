
interface Components {
    name: string;
    moduleName: string;
    component?: Components[];
    show?: boolean;
}
const components: Components[] = [
    {
        name: 'Banner',
        moduleName: 'HsBanner',
        show: true,
    },
    {
        name: 'BannerBox',
        moduleName: 'HsBannerBox',
        component: [],
        show: true,
    },
    {
        name: 'ImageGroup',
        moduleName: 'HsImageGroup',
        show: true,
    },
    {
        name: 'GoodsSlide',
        moduleName: 'HsGoodsSlide',
        show: true,
    },
    {
        name: 'GoodsList',
        moduleName: 'HsGoodsList',
        show: true,
    },
    {
        name: 'GoodsListOther',
        moduleName: 'HsGoodsListOther',
        show: false,
    },
    {
        name: 'FloatNav',
        moduleName: 'HsFloatNav',
        component: [],
        show: true,
    },
    {
        name: 'GoodsTest',
        moduleName: 'HsGoodsTest',
        show: false,
    },
    {
        name: 'Placeholder',
        moduleName: 'HsPlaceholder',
        show: true,
    },
];

export default components;
