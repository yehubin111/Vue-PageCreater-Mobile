<template>
  <div class="page" :style="globalStyles">
    <module :componentsConfigs="componentsConfigs"></module>
  </div>
</template>

<script>
import axios from "axios";
import { getSearch } from "@/assets/common";
import Module from "./Module";
import { hsChangeTitle } from "@/packages/phonePlugins";
export default {
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
    let pageid = getSearch('pageid');
    let url = `${this.baseurl}/${pageid}`;
    axios.get(decodeURIComponent(url)).then(res => {
      this.configs = res.data;
    });
  },
  mounted() {
    
  },
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
      hsChangeTitle(n.title);
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
