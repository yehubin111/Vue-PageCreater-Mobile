interface CompInfo {
    name: string;
    key: string;
    default?: string | number;
    child?: CompInfo[];
    type?: string;
}
interface Components {
    name: string;
    moduleName: string;
    info: CompInfo[];
    // watch: boolean;
}
const components: Components[] = [
    {
        name: 'Banner',
        moduleName: 'HsBanner',
        info: [
            { name: '图片地址', key: 'url', default: '', type: 'input'},
            { name: '上边距', key: 'marginTop', default: '0px', type: 'input'},
        ],
    },
    {
        name: 'ImageGroup',
        moduleName: 'HsImageGroup',
        info: [
            { name: '左右边距', key: 'bothPadding', default: '0px', type: 'input' },
            { name: '上边距', key: 'marginTop', default: '0px', type: 'input'},
            { name: '数量', key: 'count', default: 1, type: 'radio' },
            { name: '图片间隔', key: 'gap', default: '0px', type: 'input' },
            { name: '图片列表', key: 'list', child: [
                { name: '图片地址1', key: 'url1', default: '', type: 'input' },
                { name: '图片地址2', key: 'url2', default: '', type: 'input' },
                { name: '图片地址3', key: 'url3', default: '', type: 'input' },
                { name: '图片地址4', key: 'url4', default: '', type: 'input' },
            ] },
        ],
    },
    {
        name: 'GoodsList',
        moduleName: 'HsGoodsList',
        info: [
            { name: '左右边距', key: 'bothPadding', default: '0px', type: 'input' },
            { name: '上边距', key: 'marginTop', default: '0px', type: 'input'},
            { name: '专题号', key: 'topicid', default: '', type: 'input' },
            { name: '行数（一行两个）', key: 'linecount', default: '1', type: 'input' },
            { name: '商品间隔', key: 'gap', default: '0px', type: 'input' },
        ],
    },
];

export default components;
