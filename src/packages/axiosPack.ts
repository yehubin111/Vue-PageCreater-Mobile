import axios from 'axios'
import Toast from 'vant/lib/toast';
import { getUserInfo } from "@/packages/phonePlugins";

const AXIOS = axios.create({
    // baseURL: baseurl[process.env.VUE_APP_URLBASE].BASE_URL,
    timeout: 10000,
    headers: {
        Platform: "2",
        // Authorization: "0db0242aad6b5266fa7b61857ba34b22"
    },
    // loadDom: ''
})

const getToken = (function() {
    let token = "";
    return function () {
        if (token)
            Promise.resolve(token);
        else {
            getUserInfo();
            (window as any).iosUserInfo = (json: string) => {
                token = JSON.parse(json).token;
                Promise.resolve(token);
            }
        }
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
        // 请求成功，去掉loading
        // if (LOAD)
        //     LOAD.close();

        let r = res.data;
        if (r.code && r.code != 0) {
            Toast(r.msg);
            return Promise.reject('error');
        } else {
            return r;
        }
    }
)

export default AXIOS;