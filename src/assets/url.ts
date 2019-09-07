interface BaseUrl {
    web: string;
    mgr: string;
    out: string;
    weex: string;
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
    [index: string]: Object;
}
export const getBaseUrl: GetBaseUrl = function () {
    let base = {
        web: '',
        mgr: '',
        out: '',
        weex: ''
    };
    switch (process.env.VUE_APP_URLBASE) {
        case 'development':
            base['web'] = '';
            base['mgr'] = 'http://dev-mgr-yuncang.highstreet.top'; //'http://dev-mgr-yuncang.highstreet.top';
            base['weex'] = 'http://dev-weex-yuncang.highstreet.top';
            // base['out'] = '';
            break;
        case 'testing':
            base['web'] = ''; // http://dev-web-yuncang.highstreet.top
            base['mgr'] = 'http://dev-mgr-yuncang.highstreet.top'; // 
            base['weex'] = 'http://dev-weex-yuncang.highstreet.top';
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
    return base;
}

const _base: BaseUrl = getBaseUrl();
const url: Url = {
    mgr: {
        qiniutoken: "/mgr_yuncang/common/getQiniuToken",
    },
    web: {
        goodslist: "/api_yuncang/topic/v2/queryProductsByTopicId?topicId={topicId}&pageOffset={pageOffset}&pageSize={count}",
        coupon: '/api_yuncang/coupon/drawCouponForWap',
        luckydraw: '/api_yuncang/lottery/getLottery', // 初始化抽奖
        getaward: '/api_yuncang/lottery/drawLottery', // 获取奖品
        luckycheck: '/api_yuncang/lottery/checkLotteryVaild', // 抽空校验
    },
    weex: {
        taskcenter: '/taskcenter.js', // 任务中心
        secklist: '/secklist.js' // 秒杀列表
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