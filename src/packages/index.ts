import Banner from './Banner';
import ImageGroup from './ImageGroup';
import GoodsList from './GoodsList';
import GoodsListOther from './GoodsListOther';
import FloatNav from './FloatNav';
import GoodsSlide from './GoodsSlide';

const components = [
    Banner,
    ImageGroup,
    GoodsList,
    GoodsListOther,
    FloatNav,
    GoodsSlide
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
        component.created = function () {
            const allInfo: ConfigArray[] = this._getConfig(this.keyOption);
            this.$emit('initConfig', allInfo);
        };
        // 添加getConfig方法
        component.methods._getConfig = function (info: any): ConfigArray[] {
            const me = this;
            // const arr: ConfigArray[] = [];
            const obj: any = {};
            Object.keys(info).forEach((v): void => {
                obj[v] = {
                    default: me[v],
                    ...info[v],
                }
            });
            return obj;
        };
        // 添加类型判断方法
        component.methods._typeJudge = function (data: any, type: string): boolean | string {
            if (type) {
                return Object.prototype.toString.call(data).slice(8, -1) === type;
            } else {
                return Object.prototype.toString.call(data).slice(8, -1);
            }
        };
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
    GoodsListOther,
    FloatNav,
    GoodsSlide
};
