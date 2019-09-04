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