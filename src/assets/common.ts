import Clipboard from 'clipboard';
import { Msgsuccess } from './plugins';
export function getSearch(key: string, url?: string) {
    let urlsearch = url ? url.match(/(?:\?)[^\#]*/g) : '';
    let _sh = urlsearch ? urlsearch[0].substr(1) : decodeURIComponent(location.search.substr(1));
    if (!_sh)
        return null;

    let _search = new URLSearchParams(_sh);
    return _search.get(key);
}

export function typeJudge(data: any, type?: string) {
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

export function textCopy(target: string) {
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

interface Func {

}
export function debounceFc(func: any, wait: number) {
    let timeout: any;
    return function (this: any) {
        const me = this;
        const argu = arguments[0];
        if (timeout) { clearTimeout(timeout); }

        timeout = setTimeout(() => {
            func.call(me, argu);
        }, wait);
    };
}