export interface CompInfo {
    name: string; // 名称
    key?: string; // 参数名，与传入组件的参数对应
    default?: string | number; // 默认值
    child?: CompInfo[] | InfoObject; // 子元素，多为列表形式
    type?: string;  // 编辑框类型
    accept?: string; // 向上受影响参数
    bind?: string[]; // 向下关联参数
}
export interface InfoObject {
    [propName: string]: CompInfo;
}
export interface ComConfig {
    list?: ComConfig[];
    [propName: string]: any;
}