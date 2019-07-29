
import { typeJudge } from './common';
export default {
    install(Vue, options) {
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
    }
}