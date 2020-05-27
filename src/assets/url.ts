interface BaseUrl {
    web: string;
    mgr: string;
    out: string;
    weex: string;
    mall: string;
    [index: string]: string;
}
interface GetBaseUrl {
    (): BaseUrl;
}
interface Object {
    [index: string]: string
}
interface Url {
    mgr: Object;
    web: Object;
    weex: Object;
    mall: Object;
    [index: string]: Object;
}
export const getBaseUrl: GetBaseUrl = function () {
    let base = {
        web: '',
        mgr: '',
        out: '',
        weex: '',
        mall: ''
    };
    switch (process.env.VUE_APP_URLBASE) {
        case 'development':
            base['web'] = '';
            base['mgr'] = 'http://dev-mgr-yuncang.highstreet.top'; //'http://dev-mgr-yuncang.highstreet.top';
            base['weex'] = 'http://dev-weex-yuncang.highstreet.top';
            // base['out'] = '';
            break;
        case 'develop':
            base['web'] = ''; // http://dev-web-yuncang.highstreet.top
            base['mgr'] = 'http://dev-mgr-yuncang.highstreet.top'; // 
            base['weex'] = 'http://dev-weex-yuncang.highstreet.top';
            // base['out'] = '';
            break;
        case 'testing':
            base['web'] = ''; // http://dev-web-yuncang.highstreet.top
            base['mgr'] = 'http://test.mgr.yuncang.highstreet.top'; // 
            base['weex'] = 'http://test.weex.yuncang.highstreet.top';
            // base['out'] = '';
            break;
        case 'production':
            base['web'] = ''; // http://web.yuncang.highstreet.top
            base['mgr'] = 'http://mgr.yuncang.highstreet.top'; // 
            base['weex'] = 'http://weex.yuncang.highstreet.top';
            // base['out'] = '';
            break;
    }
    base['out'] = location.origin;
    base['mall'] = location.origin;
    return base;
}

const _base: BaseUrl = getBaseUrl();
const url: Url = {
    mgr: {
        qiniutoken: "/mgr_yuncang/common/getQiniuToken",
    },
    web: {
        goodslist: "/api_yuncang/topic/v2/queryProductsByTopicId",
        coupon: '/api_yuncang/coupon/drawCouponForWap',
        luckydraw: '/api_yuncang/lottery/getLottery', // 初始化抽奖
        getaward: '/api_yuncang/lottery/drawLottery', // 获取奖品
        luckycheck: '/api_yuncang/lottery/checkLotteryVaild', // 抽空校验
        // getWxJsSDKSign: '/api_merchant/wx/getWxJsSDKSign', // 微信sdk签名
    },
    weex: {
        taskcenter: '/taskcenter.js', // 任务中心
        secklist: '/secklist.js' // 秒杀列表
    },
    mall: {
        login: '/micromall/?frm={baseurl}#/login', // 微商城登录
        topic: '/micromall/#/topic?topicid={topicid}&inviteCode={inviteCode}', // 专题
        msecklist: '/micromall/#/secklist?inviteCode={inviteCode}', // 秒杀
        productdetail: '/micromall/#/product_detail?productId={productId}&inviteCode={inviteCode}&activeId={activeId}' // 商品详情
    }
}
let _url: Object = {};
Object.keys(url).forEach(v => {
    let obj = url[v];
    Object.keys(obj).forEach(g => {
        _url[g] = _base[v] + obj[g];
    })
})
export let URL = _url;
export let WHITELIST = ['goodslist']; // 无需鉴权白名单
export let GRAYLIST = ['luckydraw']; // 特殊接口，无token可不传