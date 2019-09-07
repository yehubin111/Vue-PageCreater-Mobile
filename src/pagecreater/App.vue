<template>
  <div class="app" id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import { getUserToken } from "@/packages/phonePlugins";
export default {
  // name: 'app'
  mounted() {
    let me = this;
    getUserToken();
    window.jsGetAppToken = usertoken => {
      me.SETUSERTOEKN(usertoken);
    };
  },
  methods: {
    ...mapMutations(["SETUSERTOEKN"])
  }
};
</script>  
<style lang="less">
@import url("../assets/common");
</style>

