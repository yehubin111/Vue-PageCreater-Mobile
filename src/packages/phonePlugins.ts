import { inApp, jumpCtrl } from '@/packages/common';
import { setSearch } from '@/assets/common';
import { URL } from '@/assets/url';
import store from '@/pagetemplate/store';

/* 客户端交互 */
let DeviceType = '';
if ((process as any).browser) {
    const ua = navigator.userAgent;  // 获取userAgent
    // console.log(navigator)
    if (ua.match(/Android/i) != null) {
        DeviceType = 'Android';
    } else if (ua.match(/iPhone|iPod|ios/i) != null) {
        DeviceType = 'IOS';
    }
}

// 前往商品详情页面
export function toGoodsDetial(productId: string, inviteCode: string) {
    if (inApp())
        try {
            switch (DeviceType) {
                case 'Android':
                    (window as any).JSInterface.toGoodsDetial(productId);
                    break;
                case 'IOS':
                    (window as any).webkit.messageHandlers.toGoodsDetial.postMessage(productId);
                    break;
            }
        } catch (e) {
            (console).log(e);
        }
    else {
        if (!jumpCtrl()) return;

        let url = URL.productdetail.replace('{productId}', productId)
            .replace('{inviteCode}', inviteCode)
            .replace('{activeId}', '');
        location.href = url;
    }
}

// 参数 专题id
export function toTopic(topicId: string, inviteCode: string) {
    if (inApp())
        try {
            switch (DeviceType) {
                case 'Android':
                    (window as any).JSInterface.toTopic(topicId);
                    break;
                case 'IOS':
                    (window as any).webkit.messageHandlers.toTopic.postMessage({ topicId });
                    break;
            }
        } catch (e) {
            (console).log(e);
        }
    else {
        if (!jumpCtrl()) return;

        let url = URL.topic.replace('{topicid}', topicId)
            .replace('{inviteCode}', inviteCode)
        location.href = url;
    }
}

// 修改title
export function hsChangeTitle(title: string) {
    try {
        switch (DeviceType) {
            case 'Android':
                (window as any).JSInterface.setTextTitle(title);
                break;
            case 'IOS':
                (window as any).webkit.messageHandlers.TDWebKit.postMessage(title);
                break;
        }
    } catch (e) {
        (console).log(e);
    }
}

// 修改title
export function activeShare(title: string, desc: string, link: string) {
    try {
        switch (DeviceType) {
            case 'Android':
                (window as any).JSInterface.activeShare(title, desc, link);
                break;
            case 'IOS':
                (window as any).webkit.messageHandlers.activeShare.postMessage({title, description: desc, linkUrl: link});
                break;
        }
    } catch (e) {
        (console).log(e);
    }
}

// 获取用户信息
export function getUserInfo() {
    try {
        switch (DeviceType) {
            case 'Android':
                (window as any).JSInterface.getUserInfo();
                break;
            case 'IOS':
                (window as any).webkit.messageHandlers.getUserInfo.postMessage(null);
                break;
        }
    } catch (e) {
        console.log(e);
    }
}

// getUserInfo 获取用户token
export function getUserToken() {
    try {
        switch (DeviceType) {
            case 'Android':
                (window as any).JSInterface.getAppToken('1');
                break;
            case 'IOS':
                (window as any).webkit.messageHandlers.getAppToken.postMessage(null);
                break;
        }
    } catch (e) {
        console.log(e);
    }
}

// 打开weex 页面
export function toScheme(weex: string, inviteCode: string) {
    if (inApp()) {
        let urlStr = 'taohuocang://post/weex?url=' + URL[weex]
        try {
            switch (DeviceType) {
                case 'Android':
                    (window as any).JSInterface.toScheme(urlStr);
                    break;
                case 'IOS':
                    (window as any).webkit.messageHandlers.toScheme.postMessage(urlStr);
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    } else {
        if (!jumpCtrl()) return;

        switch (weex) {
            case 'secklist':
                let url = URL.msecklist.replace('{inviteCode}', inviteCode);
                location.href = url;
                break;
            case 'taskcenter':
                openApp(weex);
                break;
        }
    }
}

// 去我的优惠券页面
export function toMyCoupon() {
    if (inApp())
        try {
            switch (DeviceType) {
                case 'Android':
                    (window as any).JSInterface.toMyCoupon();
                    break;
                case 'IOS':
                    (window as any).webkit.messageHandlers.toMyCoupon.postMessage(null);
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    else {
        if (!jumpCtrl()) return;
        openApp('coupon');
    }
}

// 去我的云朵页面
export function toMyCloud() {
    if (inApp())
        try {
            switch (DeviceType) {
                case 'Android':
                    (window as any).JSInterface.toMyCloud();
                    break;
                case 'IOS':
                    (window as any).webkit.messageHandlers.toMyCloud.postMessage(null);
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    else {
        if (!jumpCtrl()) return;
        openApp('cloud');
    }
}

// 去我的会员卡页面
export function toMyCard() {
    if (inApp())
        try {
            switch (DeviceType) {
                case 'Android':
                    (window as any).JSInterface.toMyCard();
                    break;
                case 'IOS':
                    (window as any).webkit.messageHandlers.toMyCard.postMessage(null);
                    break;
            }
        } catch (e) {
            console.log(e);
        }
    else {
        if (!jumpCtrl()) return;
        openApp('card');
    }
}

// 是否微信浏览器打开
export function isWeixin() {
    // 微信浏览器打开
    let agent = window.navigator.userAgent.toLowerCase();
    return (agent as any).match(/MicroMessenger/i) == 'micromessenger';
}

type AppPageName = 'taskcenter' | 'coupon' | 'card' | 'cloud';
// 浏览器中H5唤起APP并打开商品详情页面
export function openApp(name: AppPageName, params?: any) {
    let startType = {
        'taskcenter': '105',
        'coupon': '106',
        'card': '107',
        'cloud': '108'
    };
    let option = {
        startType: startType[name],
        productId: '',
        activeProductId: ''
    }
    params = Object.assign({}, option, params);
    let search = Object.entries(params).map(v => v.join('=')).join('&');
    if (isWeixin()) {
        let hashindex = location.href.indexOf('#');
        let hash = location.href.substring(hashindex);
        location.href = location.href.substring(0, hashindex) + '#/?' + setSearch('toapp', name, hash);
        alert(location.href);
        store.commit('SETSTATE', { key: 'openSafari', value: true });
        return;
    }
    try {
        switch (DeviceType) {
            case 'Android':
                window.location.href = 'taohuocang://post/splash?' + search;
                setTimeout(function () {
                    location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.highstreet.taobaocang&fromcase=40002#opened';
                }, 2000);
                break;
            case 'IOS':
                window.location.href = 'taohuocang://post/splash?' + search;
                setTimeout(function () {
                    let url = 'https://apps.apple.com/cn/app/%E9%AB%98%E8%A1%97%E4%BA%91%E4%BB%93%E6%B5%B7%E6%B7%98-%E5%A5%A2%E4%BE%88%E5%93%81%E5%85%A8%E7%90%83%E6%B5%B7%E5%A4%96%E4%BB%A3%E8%B4%AD%E6%8A%98%E6%89%A3%E5%B9%B3%E5%8F%B0/id1451281746';
                    location.replace(url)
                }, 2000);
                break;
        }

    } catch (e) {
        console.log(e);
    }
}