// 一些需要补充单位的属性 key: unit
export const unitKey: UnitKey = {
    padding: 'px',
};
// 全局配置
export const globalInfo: GlobalInfoStyle[] = [
    { name: '标题', key: 'title', default: '', type: 'input'},
    { name: '样式', key: 'styles', child: [
        { name: '内边距', key: 'padding', default: '0px', type: 'input' },
        { name: '背景色', key: 'background-color', default: '', type: 'color' },
    ]},
];
// 单选项
export const radioSelect: RadioSelect = {
    count: [{ key: 1, value: '1列' }, { key: 2, value: '2列' }, { key: 3, value: '3列' }, { key: 4, value: '4列' }],
};

interface RadioSelectChild {
    [index: string]: string | number;
}
interface RadioSelect {
    count: RadioSelectChild[];
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
