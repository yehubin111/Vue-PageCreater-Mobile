
import { typeJudge } from './common';
import { Info, Props, Config, InfoObject, InfoArray } from '@/pagecreater/type';
import { VueConstructor } from 'vue'
export default {
    install(Vue: VueConstructor) {
        // info to config
        Vue.prototype.$i2c = function(info: InfoObject, type?: string): Props {
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
        Vue.prototype.$iLocal = function (obj: Config[], i: number | string, type?: string) {
            let idxarr = i.toString().split('-').map(v => parseInt(v));
            let lastidx = idxarr.slice(-1)[0];
            idxarr.length -= 1;
            let propsarr = obj;
            idxarr.forEach((v) => {
                propsarr = propsarr[v].component!;
            })
            if (type == 'del') {
                return propsarr.splice(lastidx, 1);
            } else {
                return propsarr[lastidx];
            }
        }
        // px转vw
        Vue.prototype.$px2vw = function (px: number | string) {
            const base = 375; // 基准宽度
            return px.toString().split(' ').map(v => parseInt(v) * 100 / base + 'vw').join(' ');
        }
        // 初始化获取info
        Vue.prototype.$getConfig = function (me: any, info: InfoObject, type?: string): Info {
            let _that = this;
            let obj: any = type == 'Array' ? [] : {};
            Object.keys(info).forEach((v) => {
                // console.log(v);
                if (me[v] !== undefined) {
                    if (typeof info[v]['child'] == 'object') {
                        let type = Array.isArray(info[v]['child']) ? "Array" : "Object";
                        // 数组特殊情况 info初始化数量与props对应字段数量不同
                        if (type == 'Array') {
                            let infoobj = (<InfoArray>info[v]['child'])[0];
                            (<InfoArray>info[v]['child']) = [];
                            while ((<InfoArray>info[v]['child']).length < me[v].length) {
                                (<InfoArray>info[v]['child']).push(infoobj);
                            }
                        }
                        obj[v] = {
                            ...info[v],
                            child: _that.$getConfig(me[v], info[v]['child'], type)
                        }
                    } else {
                        obj[v] = {
                            ...info[v],
                            default: me[v]
                        };
                    }
                }
            })
            return obj;
        }
    }
}