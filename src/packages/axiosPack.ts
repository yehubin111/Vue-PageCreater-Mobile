import axios from 'axios'
import Toast from 'vant/lib/toast';

const AXIOS = axios.create({
    // baseURL: baseurl[process.env.VUE_APP_URLBASE].BASE_URL,
    timeout: 10000,
    // headers: {
    //     'X-Token': localStorage.getItem('atom_token')
    // },
    // loadDom: ''
})

// let LOAD;
// request拦截器
AXIOS.interceptors.request.use(
    config => {
        // 请求拦截，加入loading
        // if (config.loadDom || config.fullscreen) {
        //     let dom = document.getElementById(config.loadDom);
        //     LOAD = Loading.service({ target: dom, fullscreen: config.fullscreen });
        // }
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