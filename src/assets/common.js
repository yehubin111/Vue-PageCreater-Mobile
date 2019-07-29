import Clipboard from 'clipboard';
import { Msgsuccess } from './plugins';
export function getSearch(key, url) {
    var _sh = url ? url.match(/(?:\?)[^\#]*/g)[0].substr(1) : decodeURIComponent(location.search.substr(1));
    if (!_sh)
        return null;

    let _search = new URLSearchParams(_sh);
    return _search.get(key);
}

export function typeJudge(data, type) {
    if (!type)
        return Object.prototype.toString.call(data).slice(8, -1)
    else
        return Object.prototype.toString.call(data).slice(8, -1) === type;
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
export function getUUID() {
    return (S4() + S4() + "-" + S4());
}

export function textCopy(target) {
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

export function debounceFc(func, wait) {
    let timeout;
    return function () {
        const me = this;
        const argu = arguments[0];
        if (timeout) { clearTimeout(timeout); }

        timeout = setTimeout(() => {
            func.call(me, argu);
        }, wait);
    };
}