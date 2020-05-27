<template>
  <div class="page" :style="globalStyles">
    <module :componentsConfigs="componentsConfigs"></module>
  </div>
</template>

<script>
import axios from "axios";
import { getSearch } from "@/assets/common";
import Module from "./Module";
import {
  hsChangeTitle,
  activeShare,
  isWeixin,
  openApp
} from "@/packages/phonePlugins";
export default {
  provide() {
    return {
      pv_inviteCode: getSearch("inviteCode")
    };
  },
  data() {
    return {
      // href: location.href,
      configs: {},
      baseurl: "http://p7.highstreet.top" // 七牛云baseurl
    };
  },
  components: {
    Module
  },
  created() {
    // let toapp = this.$route.query.toapp;
    // // 如果不是微信环境，打开页面跳转toapp地址
    // if(!isWeixin() && toapp) {
    //   openApp(toapp);
    // }
    let pageid = getSearch("pageid");
    // let pageid = this.$route.query.pageid;
    let url = `${this.baseurl}/${pageid}`;
    axios.get(decodeURIComponent(url)).then(res => {
      this.configs = res.data;
    });
    // 20200421新增，根据source判断是否在其他app上打开，支付成功页面判断用
    let source = getSearch("source");
    if (source) localStorage.setItem("h5source", source);
  },
  mounted() {},
  computed: {
    globalConfigs() {
      return this.configs.globalconfig;
    },
    componentsConfigs() {
      return this.configs.componentsconfig;
    },
    globalStyles() {
      if (this.globalConfigs) return this.globalConfigs["styles"];
      else return "";
    }
  },
  watch: {
    globalConfigs(n, o) {
      document.title = n.title;
      // 页面标题
      hsChangeTitle(n.title);
      // 初始化微信分享配置
      this.initWxJsSDKSign(n.title, n.subhead);
      // 是否开启分享
      if (n.share) {
        // 去掉#后面的内容
        let spl = location.href.indexOf("#");
        activeShare(n.title, n.subhead || "", location.href.substring(0, spl));
      }
    }
  },
  methods: {
    initWxJsSDKSign(title, desc) {
      axios
        .get(
          `/api_yuncang/wap/order/getWxJsSDKSign?pageUrl=${encodeURIComponent(
            location.href
          )}`
        )
        .then(res => {
          let r = res.data;
          wx.config({
            appId: r.appid, // 必填，公众号的唯一标识
            timestamp: r.timestamp, // 必填，生成签名的时间戳
            nonceStr: r.noncestr, // 必填，生成签名的随机串
            signature: r.sign, // 必填，签名
            jsApiList: [
              // JS接口列表
              "updateAppMessageShareData"
            ] // 必填，需要使用的JS接口列表
          });
          wx.ready(function() {
            wx.updateAppMessageShareData({
              title,
              desc
            });
          });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  overflow: hidden;
}
</style>
