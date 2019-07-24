import Banner from './Banner';
import ImageGroup from './ImageGroup';
import GoodsList from './GoodsList';

// const components = [
//     Banner,
//     ImageGroup,
//     GoodsList,
// ];


// components.forEach(v => {
//     v.methods.getConfig();
// })
// console.log(Banner);

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
        info: [
            { name: '图片', type: 'fileupload', key: 'url', default: '' },
            { name: '上边距', type: 'input', key: 'marginTop', default: '0px' },
        ],
    },
    {
        name: 'ImageGroup',
        moduleName: 'HsImageGroup',
        info: [
            { name: '左右边距', key: 'bothPadding', default: '0px', type: 'input' },
            { name: '上边距', key: 'marginTop', default: '0px', type: 'input' },
            { name: '数量', key: 'count', default: 1, type: 'radio', bind: ['list'] },
            { name: '图片间隔', key: 'gap', default: '0px', type: 'input' },
            {
                name: '点击事件',
                key: 'clickEvent',
                default: 'topic', type: 'radio', bind: ['alert', 'topic', 'goodsdetail', 'h5link'],
            },
            {
                name: '图片列表', key: 'list', accept: 'count', child: [
                    {
                        name: '图片1', key: 'url1', child: [
                            { name: '图片', key: 'url', default: '', type: 'fileupload' },
                            { name: '弹出框图片', key: 'alert', default: '', type: 'fileupload', accept: 'clickEvent' },
                            { name: '弹出框图片宽度', key: 'alertwidth', default: '0px', type: 'input', accept: 'clickEvent' },
                            { name: '专题编号', key: 'topic', default: '', type: 'input', accept: 'clickEvent' },
                            { name: '商品id', key: 'goodsdetail', default: '', type: 'input', accept: 'clickEvent' },
                            { name: 'h5链接', key: 'h5link', default: '', type: 'input', accept: 'clickEvent' },
                        ],
                    },
                    {
                        name: '图片2', key: 'url2', child: [
                            { name: '图片', key: 'url', default: '', type: 'fileupload' },
                            { name: '弹出框图片', key: 'alert', default: '', type: 'fileupload', accept: 'clickEvent' },
                            { name: '弹出框图片宽度', key: 'alertwidth', default: '0px', type: 'input', accept: 'clickEvent' },
                            { name: '专题编号', key: 'topic', default: '', type: 'input', accept: 'clickEvent' },
                            { name: '商品id', key: 'goodsdetail', default: '', type: 'input', accept: 'clickEvent' },
                            { name: 'h5链接', key: 'h5link', default: '', type: 'input', accept: 'clickEvent' },
                        ],
                    },
                    {
                        name: '图片3', key: 'url3', child: [
                            { name: '图片', key: 'url', default: '', type: 'fileupload' },
                            { name: '弹出框图片', key: 'alert', default: '', type: 'fileupload', accept: 'clickEvent' },
                            { name: '弹出框图片宽度', key: 'alertwidth', default: '0px', type: 'input', accept: 'clickEvent' },
                            { name: '专题编号', key: 'topic', default: '', type: 'input', accept: 'clickEvent' },
                            { name: '商品id', key: 'goodsdetail', default: '', type: 'input', accept: 'clickEvent' },
                            { name: 'h5链接', key: 'h5link', default: '', type: 'input', accept: 'clickEvent' },
                        ],
                    },
                    {
                        name: '图片4', key: 'url4', child: [
                            { name: '图片', key: 'url', default: '', type: 'fileupload' },
                            { name: '弹出框图片', key: 'alert', default: '', type: 'fileupload', accept: 'clickEvent' },
                            { name: '弹出框图片宽度', key: 'alertwidth', default: '0px', type: 'input', accept: 'clickEvent' },
                            { name: '专题编号', key: 'topic', default: '', type: 'input', accept: 'clickEvent' },
                            { name: '商品id', key: 'goodsdetail', default: '', type: 'input', accept: 'clickEvent' },
                            { name: 'h5链接', key: 'h5link', default: '', type: 'input', accept: 'clickEvent' },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'GoodsList',
        moduleName: 'HsGoodsList',
        info: [
            { name: '左右边距', type: 'input', key: 'bothPadding', default: '0px' },
            { name: '上边距', type: 'input', key: 'marginTop', default: '0px' },
            { name: '专题号', type: 'input', key: 'topicid', default: '' },
            { name: '行数（一行两个）', type: 'input', key: 'linecount', default: '1' },
            { name: '商品间隔', type: 'input', key: 'gap', default: '0px' },
        ],
    },
];

export default components;
