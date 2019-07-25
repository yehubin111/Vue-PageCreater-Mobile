import Banner from './Banner';
import ImageGroup from './ImageGroup';
import GoodsList from './GoodsList';

interface CompInfo {
    name: string; // 名称
    key: string; // 参数名，与传入组件的参数对应
    default?: string | number; // 默认值
    child?: CompInfo[]; // 子元素，多为列表形式
    type?: string;  // 编辑框类型
    accept?: string; // 向上受影响参数
    bind?: string[]; // 向下关联参数
}
interface Components {
    name: string;
    moduleName: string;
    info?: CompInfo[];
}
const components: Components[] = [
    {
        name: 'Banner',
        moduleName: 'HsBanner',
    },
    {
        name: 'ImageGroup',
        moduleName: 'HsImageGroup',
    },
    {
        name: 'GoodsList',
        moduleName: 'HsGoodsList',
    },
    {
        name: 'GoodsListOther',
        moduleName: 'HsGoodsListOther',
    },
];

export default components;
