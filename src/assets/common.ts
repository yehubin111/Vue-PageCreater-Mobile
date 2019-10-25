import Clipboard from 'clipboard';
import { Msgsuccess } from './plugins';
import { URL } from '@/assets/url';

export function getSearch(key: string, url?: string) {
    let urlsearch = url ? url.match(/(?:\?)[^\#]*/g) : '';
    let _sh = urlsearch ? urlsearch[0].substr(1) : decodeURIComponent(location.search.substr(1));
    if (!_sh)
        return null;

    let _search = new URLSearchParams(_sh);
    return _search.get(key);
}

export function setSearch(key: string, val: string, url?: string) {
    console.log(key, val, url);
    let urlsearch = url ? url.match(/(?:\?)[^\#]*/g) : location.search.match(/(?:\?)[^\#]*/g);
    let _sh = urlsearch ? urlsearch[0].substr(1) : "";

    let _search = new URLSearchParams(_sh);
    _search.set(key, val)
    return _search.toString();
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

export function lazyLoad() {
    const config = {
        root: null, // 根元素，默认为浏览器视口
        rootMargin: '0px', // 上下滑动的时候 要超过100px才会生成通知
        threshold: 0 // 越过绑定元素的比例
    }

    let observer = new IntersectionObserver(function (entries) {
        entries.forEach(v => {
            // 判断是否进入视图区
            if (v.isIntersecting || v.intersectionRatio > 0) {
                // console.log('lazyload trigger');
                let img = v.target.getAttribute('data-src');
                v.target.setAttribute('src', img!);
                // 解除绑定
                observer.unobserve(v.target);
            }
        })
    }, config);

    return observer;
}