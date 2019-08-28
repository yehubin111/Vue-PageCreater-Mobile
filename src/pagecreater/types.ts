export interface CompInfo {
    name: string; // 名称
    key?: string; // 参数名，与传入组件的参数对应
    default?: string | number; // 默认值
    child?: Info; // 子元素，多为列表形式
    type?: string;  // 编辑框类型
    accept?: string; // 向上受影响参数
    bind?: string[]; // 向下关联参数
    [propName: string]: any;
}
export interface InfoObject {
    [propName: string]: CompInfo;
}
export type InfoArray = Array<CompInfo>;
export type Info = InfoObject | InfoArray;

export interface Props {
    list?: Props[];
    [propName: string]: any;
}

export interface Config {
    name: string; // 显示名
    moduleName: string; // 模块名 
    component?: Config[]; // 包含组件列表
    show?: boolean; // 是否显示到左槽列表
    props?: Props; // 实际参数
    info?: Info; // info
}