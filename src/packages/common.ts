import { URL, GRAYLIST } from '@/assets/url';
import * as Tp from './type';
import Toast from 'vant/lib/toast';

// 获取用户token from userAgent
export const getUserTokenFromUA: Tp.GetUserTokenFromUA = (urlname) => {
    let userToken = '';
    let baseurl = encodeURIComponent(location.href);
    let loginpage = URL.login.replace('{baseurl}', baseurl);
    // let loginpage = `http://dev-web-yuncang.highstreet.top/micromall/?frm=${baseurl}#/login`
    let token = inApp();
    let cancel = false; // 是否取消请求

    if (token) {
        userToken = <string>token;
    } else {
        let storage = localStorage.getItem('vuex');
        if (storage && JSON.parse(storage).token) {
            userToken = JSON.parse(storage).token;
        } else if (GRAYLIST.includes(urlname)) {
            userToken = '';
        } else {
            cancel = true;
            if (!jumpCtrl()) return [cancel, userToken];
            location.href = loginpage;
        }
    }
    return [cancel, userToken];
}

// 阻塞延时
export const barrageTime: Tp.BarrageTime = time => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('wait');
        }, time);
    })
}

// 判断是否在云仓app内部, 云仓app ua后32位为token
export const inApp: Tp.InApp = () => {
    Toast(navigator.userAgent);
    let token = navigator.userAgent.substr(-32);
    return token.indexOf('/') == -1 ? token : false;
}

// 判断是否可以跳转页面，区分编辑情况与生成页面情况
export const jumpCtrl: Tp.JumpCtrl = () => {
    let local = location.pathname;
    return local.indexOf('pagetemplate') != -1;
}