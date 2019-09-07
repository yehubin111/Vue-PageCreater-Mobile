import Banner from './Banner';
import BannerBox from './BannerBox';
import ImageGroup from './ImageGroup';
import GoodsList from './GoodsList';
import GoodsTest from './GoodsTest';
import GoodsListOther from './GoodsListOther';
import FloatNav from './FloatNav';
import GoodsSlide from './GoodsSlide';
import Placeholder from './Placeholder';
import LuckyDraw from './LuckyDraw';

const components = [
    Banner,
    BannerBox,
    ImageGroup,
    GoodsList,
    GoodsTest,
    GoodsListOther,
    FloatNav,
    GoodsSlide,
    Placeholder,
    LuckyDraw
];

const install = (Vue: any, opts = {}): void => {
  components.forEach((component: any) => {
    Vue.component(component.name, component);
  });
};

// if (typeof window !== "undefined" && (window as any).Vue) {
//   install((window as any).Vue);
// }

export default {
    install,
    Banner,
    BannerBox,
    ImageGroup,
    GoodsList,
    GoodsTest,
    GoodsListOther,
    FloatNav,
    GoodsSlide,
    Placeholder,
    LuckyDraw
};
