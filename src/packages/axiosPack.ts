import axios, { AxiosInstance } from 'axios'
import Toast from 'vant/lib/toast';
import { getUserTokenFromUA, inApp } from "@/packages/common";
import { URL, WHITELIST } from "@/assets/url";

interface FetchData {
    [propName: string]: any
}
class Fetch {
    private axios: AxiosInstance = axios.create({
        // baseURL: baseurl[process.env.VUE_APP_URLBASE].BASE_URL,
        timeout: 10000,
        headers: {
            Platform: 'web'
            // Authorization: "0db0242aad6b5266fa7b61857ba34b22"
        }
    });
    constructor() {
        // 初始化axios拦截器
        this.init();
    }
    private init() {
        let me = this;
        // request拦截器
        this.axios.interceptors.request.use(
            config => {
                let urlname = config.params.urlname;
                /**
                 * token获取规则
                 * 1、不在白名单中的要先获取token
                 * 2、在灰名单中的如果获取不到token依然可以发送请求
                 * 3、获取不到token的则跳转登录，取消请求
                 */
                if (!WHITELIST.includes(urlname)) {
                    let token = getUserTokenFromUA(urlname);
                    config.headers.Authorization = token[1];
                    if (token[0]) {
                        return Promise.reject(new Error('no Authorization'))
                    }
                }
                delete config.params.urlname;
                return config;
            }, err => {
                console.log(err);
                return Promise.reject(err)
            }
        )

        // response拦截器
        this.axios.interceptors.response.use(
            res => {
                let r = res.data;
                if (r.code == '0') {
                    return r;
                } else {
                    let msg = r.msg;
                    // 1003 token失效情况，跳转登录
                    if (r.code == 1003 && !inApp()) {
                        let baseurl = encodeURIComponent(location.href);
                        let loginpage = URL.login.replace('{baseurl}', baseurl);
                        location.href = loginpage;
                    }
                    Toast(msg);
                    return Promise.reject(msg);
                }
            }, err => {
                console.log(err);
                return Promise.reject(err);
            }
        )
    }
    post(urlname: string, params: FetchData) {
        let url = URL[urlname];

        return new Promise((resolve, reject) => {
            this.axios({
                url,
                data: params,
                method: 'post',
                params: { urlname }
            })
                .then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
        })

    }
    get(urlname: string, params: FetchData) {
        let url = URL[urlname];
        let str = '';
        Object.keys(params).forEach(v => {
            str += `&${v}=${params[v]}`;
        });
        url = `${URL[urlname]}?${str.substr(1)}`;

        return new Promise((resolve, reject) => {
            this.axios({
                url,
                data: {},
                method: 'get',
                params: { urlname }
            })
                .then(response => {
                    resolve(response);
                }).catch(err => {
                    console.log(err);
                    reject(err);
                });
        })
    }
}

export default new Fetch();