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
export function toGoodsDetial(productId: string) {
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
}

// 参数 专题id
export function toTopic(topicId: string) {
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

// token
export const userToken = process.env.VUE_APP_URLBASE == "production"
    ? "989c594b138a1ac42325706180f49010"
    : "0db0242aad6b5266fa7b61857ba34b22"
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
            default:
                throw new Error('error');
                break;
        }
    } catch (e) {
        setTimeout(function(){
            window.jsGetAppToken(userToken);
        }, 300)
        console.log(e);
    }
}

// 打开weex 页面
export function toScheme(url: string) {
    let urlStr = 'taohuocang://post/weex?url='+url
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
}

// 去我的优惠券页面
export function toMyCoupon() {
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
}

// 去我的云朵页面
export function toMyCloud() {
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
}

// 去我的会员卡页面
export function toMyCard() {
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
}