export function getBaseUrl() {
    let base = {};
    switch (process.env.VUE_APP_URLBASE) {
        case 'development':
            base['web'] = '';
            base['mgr'] = 'http://dev-mgr-yuncang.highstreet.top';
            // base['out'] = 'http://localhost:8008';
            break;
        case 'testing':
            base['web'] = 'http://dev-web-yuncang.highstreet.top';
            base['mgr'] = 'http://dev-mgr-yuncang.highstreet.top';
            // base['out'] = 'http://dev-web-yuncang.highstreet.top';
            break;
        case 'production':
            base['web'] = 'http://web.yuncang.highstreet.top';
            base['mgr'] = 'http://mgr.yuncang.highstreet.top';
            // base['out'] = 'http://web.yuncang.highstreet.top';
            break;
    }
    base['out'] = location.origin;
    return base;
}

const _base = getBaseUrl();
const url = {
    mgr: {
        qiniutoken: "/mgr_yuncang/common/getQiniuToken",
    },
    web: {
        goodslist: "/api_yuncang/topic/v2/queryProductsByTopicId?topicId={topicId}&pageOffset=0&pageSize={count}"
    }
}
let _url = {};
Object.keys(url).forEach(v => {
    let obj = url[v];
    Object.keys(obj).forEach(g => {
        _url[g] = _base[v] + obj[g];
    })
})
export let URL = _url;