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
