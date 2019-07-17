import Clipboard from 'clipboard';
import { Msgsuccess } from './plugins';
export function getSearch(key, url) {
    var _sh = url ? url.match(/(?:\?)[^\#]*/g)[0].substr(1) : location.search.substr(1);
    if (!_sh)
        return null;

    let _search = new URLSearchParams(_sh);
    return _search.get(key);
}

export function typeJudge(data, type) {
    return Object.prototype.toString.call(data).slice(8, -1) === type;
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function getUUID() {
    return (S4() + S4() + "-" + S4());
}

export function getBaseUrl() {
    let base = '';
    switch (process.env.NODE_ENV) {
        case 'development':
            base = 'http://localhost:8008'
            break;
        case 'test':
            base = '';
            break;
        case 'production':
            base = '';
            break;
    }
    return base;
}

export function textCopy(target) {
    console.log(target);
    let clipboard = new Clipboard(target);

    clipboard.on('success', function (e) {
        // 清除选中内容
        // e.clearSelection();
        Msgsuccess('已复制到粘贴板');
    });
    clipboard.on('error', function (e) {
        console.log(e);
    });
}