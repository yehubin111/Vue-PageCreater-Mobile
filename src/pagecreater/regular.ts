// 一些需要补充单位的属性 key: unit
export const unitKey: UnitKey = {
    padding: 'px',
};
// 全局配置
export const globalInfo: GlobalInfoStyle[] = [
    { name: '标题', key: 'title', default: '', type: 'input' },
    {
        name: '样式', key: 'styles', child: [
            { name: '内边距', key: 'padding', default: '0px', type: 'input' },
            { name: '背景色', key: 'background-color', default: '', type: 'color' },
        ],
    },
];
// 单选项
export const radioSelect: RadioSelect = {
    count: [{ key: 1, value: '1列' }, { key: 2, value: '2列' }, { key: 3, value: '3列' }, { key: 4, value: '4列' }],
    clickEvent: [
        { key: 'alert', value: '弹出框' },
        { key: 'topic', value: '跳专题页' },
        { key: 'goodsdetail', value: '跳商品详情页' },
        { key: 'h5link', value: '跳h5链接' },
    ],
};

interface RadioSelectChild {
    [index: string]: string | number;
}
interface RadioSelect {
    count: RadioSelectChild[];
    clickEvent: RadioSelectChild[];
}

interface UnitKey {
    [index: string]: string;
}

interface GlobalInfoStyle {
    name: string;
    key: string;
    default?: string;
    child?: GlobalInfoStyle[];
    type?: string;
}
