import Banner from './Banner';
import BannerBox from './BannerBox';
import ImageGroup from './ImageGroup';
import GoodsList from './GoodsList';
import GoodsTest from './GoodsTest';
import GoodsListOther from './GoodsListOther';
import FloatNav from './FloatNav';
import GoodsSlide from './GoodsSlide';
import Placeholder from './Placeholder';

const components = [
    Banner,
    BannerBox,
    ImageGroup,
    GoodsList,
    GoodsTest,
    GoodsListOther,
    FloatNav,
    GoodsSlide,
    Placeholder
];

interface ConfigArray {
  name: string;
  key: string;
  default?: string;
  type?: string;
  bind?: string[];
  accept?: string;
  child?: ConfigArray[];
}

const install = (Vue: any, opts = {}): void => {
  components.forEach((component: any) => {
    // 扩展组件created方法
    component.created = function() {
      const allInfo: ConfigArray[] = this.$getConfig(this, this.keyOption);
      this.$emit("initConfig", allInfo);
    };
    // 添加getConfig方法
    // component.methods._getConfig = function(me: any, info: any, type: string): ConfigArray[] {
    //   console.log(this);
    //   let obj: any = type == 'Array'?[]:{};
    //   Object.keys(info).forEach(
    //     (v): void => {
    //       // console.log(v);
    //       if (typeof info[v]['child'] == 'object') {
    //         let type = Array.isArray(info[v]['child']) ? "Array": "Object";
    //         let that = me[v];
    //         obj[v] = {
    //           child: me._getConfig(that, info[v]['child'], type),
    //           ...info[v]
    //         }
    //       }
    //       //  else if (this._typeJudge(info[v]['child'], 'Object')) {
    //       //   obj[v] = {
    //       //     child: this._getConfig(info[v]['child']),
    //       //     ...info[v]
    //       //   }
    //       // } 
    //       else {
    //         obj[v] = {
    //           default: me[v],
    //           ...info[v]
    //         };
    //       }
    //     }
    //   );
    //   return obj;
    // };
    // 添加类型判断方法
    // component.methods._typeJudge = function(
    //   data: any,
    //   type: string
    // ): boolean | string {
    //   if (type) {
    //     return Object.prototype.toString.call(data).slice(8, -1) === type;
    //   } else {
    //     return Object.prototype.toString.call(data).slice(8, -1);
    //   }
    // };
    Vue.component(component.name, component);
  });
};

if (typeof window !== "undefined" && (window as any).Vue) {
  install((window as any).Vue);
}

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
    Placeholder
};
