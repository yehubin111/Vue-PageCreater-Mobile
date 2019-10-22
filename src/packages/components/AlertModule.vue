<template>
  <transition name="fade">
    <div class="alert" @click="cancelAlert" v-show="status">
      <img :src="alertimg" alt :style="{width: $px2vw(alertwidth)}"/>
    </div>
  </transition>
</template>

<script>
export default {
  name: "HsAlertModule",
  props: {
    status: {
      type: Boolean,
      required: true
    },
    alertimg: {
      type: String,
      required: true
    },
    alertwidth: {
      type: String
    }
  },
  data() {
    return {};
  },
  methods: {
    cancelAlert() {
      this.$emit("update:status", false);
    }
  }
};
</script>
<style lang="less">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style lang="less" scoped>
.alert {
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    display: block;
  }
}
</style>
