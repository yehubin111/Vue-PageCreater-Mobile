
import { typeJudge } from './common';
export default {
    install(Vue) {
        // info to config
        Vue.prototype.$i2c = function (info, type) {
            let config = type == 'Array' ? [] : {};
            Object.keys(info).forEach(v => {
                let childtype = typeJudge(info[v].child);
                if (childtype == 'Object' || childtype == 'Array') {
                    this.$set(config, v, this.$i2c(info[v].child, childtype));
                } else {
                    this.$set(config, v, info[v].default);
                }
            });
            return config;
        }
        // index定位
        Vue.prototype.$iLocal = function (obj, i, type) {
            let idxarr = i.toString().split('-');
            let lastidx = idxarr.slice(-1);
            idxarr.length -= 1;
            let propsarr = obj;
            idxarr.forEach((v) => {
                propsarr = propsarr[v * 1].component;
            })
            if (type == 'del') {
                return propsarr.splice(lastidx * 1, 1);
            } else {
                return propsarr[lastidx * 1];
            }
        }
        // px转vw
        Vue.prototype.$px2vw = function(px) {
            const base = 375; // 基准宽度
            return px.split(' ').map(v => parseInt(v) * 100 / base + 'vw').join(' ');
        }
    }
}