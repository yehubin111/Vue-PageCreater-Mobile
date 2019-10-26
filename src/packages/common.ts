import { URL, GRAYLIST } from '@/assets/url';

// 获取用户token from userAgent
export function getUserTokenFromUA(urlname: string) {
    let userToken = '';
    let baseurl = encodeURIComponent(location.href);
    let loginpage = URL.login.replace('{baseurl}', baseurl);
    // let loginpage = `http://dev-web-yuncang.highstreet.top/micromall/?frm=${baseurl}#/login`
    let token = inApp();

    if (token) {
        userToken = token;
    } else {
        let storage = localStorage.getItem('vuex');
        if(storage && JSON.parse(storage).token) {
            userToken = JSON.parse(storage).token;
        } else if (GRAYLIST.includes(urlname)) {
            userToken = '';
        } else {
            if (!jumpCtrl()) return;
            location.href = loginpage;
            // 阻塞2s
            barrageTime(2000);
        }
    }
    return userToken;
}

// 阻塞延时
export function barrageTime(time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('wait');
        }, time);
    })
}

// 判断是否在云仓app内部, 云仓app ua后32位为token
export function inApp() {
    let token = navigator.userAgent.substr(-32);
    return token.indexOf('/') == -1 ? token : false;
}

// 判断是否可以跳转页面，区分编辑情况与生成页面情况
export function jumpCtrl() {
    let local = location.pathname;
    return local.indexOf('pagetemplate') != -1;
}