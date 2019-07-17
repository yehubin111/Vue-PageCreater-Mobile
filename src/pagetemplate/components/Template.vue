<template>
  <div class="page" :style="globalStyles">
    <div v-for="(cg, index) in componentsConfigs" :key="index">
      <module :name="cg.moduleName" :props="cg.props"></module>
    </div>
  </div>
</template>

<script>
import { getSearch } from "@/assets/common";
import axios from "axios";
import Module from "./Module";
export default {
  data() {
    return {
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
    axios.get(url).then(res => {
      this.configs = res.data;
    });
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
    }
  }
};
</script>

<style>
</style>
