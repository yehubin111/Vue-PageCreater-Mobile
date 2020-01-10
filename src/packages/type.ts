// 客户端内部从ua上获取token
export interface GetUserTokenFromUA {
    (urlname: string): [boolean, string];
}
// 延时阻塞
export interface BarrageTime {
    (time: number): Promise<any>
}
// 判断是否在app内
export interface InApp {
    (): string | boolean
}
// 判断是否可以执行跳转（在编辑界面禁止跳转）
export interface JumpCtrl {
    (): boolean;
}
// 判断是否第三方app登录
export interface InThirdParty {
    (): boolean | string
}
// 图片
export interface Pic {
    (pic: string, size?: number): string;
}
// 图片页面导出
export type Filters = Record<string, (...args: any) => any>;
// 唤起app相关
export type StartType = {
    taskcenter: string
    coupon: string
    card: string
    cloud: string
}
export type AppPageName = keyof StartType;
