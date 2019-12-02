// info单个字段格式
export interface CompInfo {
    name: string; // 名称
    key?: string; // 参数名，与传入组件的参数对应
    default?: string | number | boolean; // 默认值
    child?: Info; // 子元素，多为列表形式
    type?: string;  // 编辑框类型
    accept?: string; // 向上受影响参数
    bind?: string[]; // 向下关联参数
    [propName: string]: any;
}
// 组件info格式
export type InfoObject = Record<string, CompInfo>;
// 组件内child格式
export type InfoArray = Array<CompInfo>;
export type Info = InfoObject | InfoArray;

export interface Props {
    list?: Props[];
    [propName: string]: any;
}
// 模块配置componentsconfig
export interface Config {
    name: string; // 显示名
    moduleName: string; // 模块名 
    component?: Config[]; // 包含组件列表
    show?: boolean; // 是否显示到左边列表
    props?: Props; // 实际参数
    info?: Info; // info
}
// 保存到七牛配置
export interface ConfigJson{
    componentsconfig: Array<Config>,
    globalconfig: Props
}