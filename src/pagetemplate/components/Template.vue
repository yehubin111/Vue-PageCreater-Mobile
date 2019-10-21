<template>
  <div class="page" :style="globalStyles">
    <module :componentsConfigs="componentsConfigs"></module>
  </div>
</template>

<script>
import axios from "axios";
import { getSearch } from "@/assets/common";
import Module from "./Module";
import { hsChangeTitle, activeShare } from "@/packages/phonePlugins";
export default {
  provide() {
    return {
      pv_inviteCode: this.$route.query.inviteCode
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
    let pageid = getSearch("pageid");
    let url = `${this.baseurl}/${pageid}`;
    axios.get(decodeURIComponent(url)).then(res => {
      this.configs = res.data;
    });
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
      // 是否开启分享
      if (n.share) {
        activeShare(n.title, n.subhead || "", location.href);
      }
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
