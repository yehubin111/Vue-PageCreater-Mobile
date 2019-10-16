import axios, { AxiosInstance } from 'axios'
import Toast from 'vant/lib/toast';
import { getUserTokenFromUA, inApp } from "@/assets/common";
import { URL, WHITELIST } from "@/assets/url";

interface FetchData {
    [propName: string]: any
}
class Fetch {
    axios: AxiosInstance = axios.create({
        // baseURL: baseurl[process.env.VUE_APP_URLBASE].BASE_URL,
        timeout: 10000,
        headers: {
            // Authorization: "0db0242aad6b5266fa7b61857ba34b22"
        }
    });
    urlname: string = "";
    constructor() {
        // 初始化axios拦截器
        this.init();
    }
    init() {
        let me = this;
        // request拦截器
        this.axios.interceptors.request.use(
            async config => {
                // 不在白名单中的要先获取token
                if(!WHITELIST.includes(me.urlname))
                    config.headers.Authorization = getUserTokenFromUA();
                return config;
            }
        )

        // response拦截器
        this.axios.interceptors.response.use(
            res => {
                let r = res.data;
                if (r.code == '0') {
                    return r;
                } else {
                    // token失效情况，跳转登录
                    if ((r.code == 1002 || r.code == 1003) && !inApp()) {
                        let baseurl = encodeURIComponent(location.href);
                        let loginpage = URL.login.replace('{baseurl}', baseurl);
                        location.href = loginpage;
                    }
                    Toast(r.msg);
                    return Promise.reject('error');
                }
            }
        )
    }
    post(urlname: string, params: FetchData) {
        this.urlname = urlname;
        let url = URL[urlname];

        return new Promise((resolve, reject) => {
            this.axios.post(url, params)
                .then(response => {
                    resolve(response);
                });
        })

    }
    get(urlname: string, params: FetchData) {
        this.urlname = urlname;
        let url = URL[urlname];
        let str = '';
        Object.keys(params).forEach(v => {
            str += `&${v}=${params[v]}`;
        });
        url = `${URL[urlname]}?${str.substr(1)}`;

        return new Promise((resolve, reject) => {
            this.axios.get(url, {})
                .then(response => {
                    resolve(response);
                });
        })
    }
}

export default new Fetch();