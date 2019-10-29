<template>
  <div class="app" id="app">
    <van-overlay
      z-index="2999"
      :show="openSafari"
      @click="SETSTATE({key: 'openSafari', value: false})"
    />
    <img
      class="tosafari"
      v-show="openSafari"
      src="http://p7.highstreet.top/FgOU2R828VSdA0ZCSoxBysv5bboI"
      @click="SETSTATE({key: 'openSafari', value: false})"
      alt
    />
    <router-view></router-view>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  // name: 'app'
  mounted() {},
  computed: {
    ...mapState(["openSafari"])
  },
  methods: {
    ...mapMutations(["SETSTATE"])
  }
};
</script>  
<style lang="less">
@import url("../assets/common");

.tosafari {
  width: 336px;
  position: absolute;
  position: fixed;
  z-index: 3000;
  right: 0;
  top: 0;
}
</style>

