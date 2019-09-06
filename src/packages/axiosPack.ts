import axios from 'axios'
import Toast from 'vant/lib/toast';
import { getUserToken } from "@/packages/phonePlugins";

const AXIOS = axios.create({
    // baseURL: baseurl[process.env.VUE_APP_URLBASE].BASE_URL,
    timeout: 10000,
    headers: {
        Platform: "2",
        // Authorization: "0db0242aad6b5266fa7b61857ba34b22"
    },
    // loadDom: ''
})

const getToken = (function () {
    let token = "";
    return function () {
        return new Promise((resolve, reject) => {
            if (token)
                resolve(token);
            else {
                getUserToken();
                (window as any).jsGetAppToken = (usertoken: string) => {
                    token = usertoken;
                    resolve(token);
                }
            }
        })

    }
})();

// let LOAD;
// request拦截器
AXIOS.interceptors.request.use(
    async config => {
        // 获取token
        if (!config.headers.Authorization) {
            config.headers.Authorization = await getToken();
        }

        return config;
    }
)

// response拦截器
AXIOS.interceptors.response.use(
    res => {
        let r = res.data;
        if (r.code && r.code != 0) {
            // Toast(r.msg);
            return Promise.reject('error');
        } else {
            return r;
        }
    }
)

export default AXIOS;