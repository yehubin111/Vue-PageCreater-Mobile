<template>
  <div class="nav">
    <div class="navlist">
      <p class="title"><i class="el-icon-s-operation"></i>全局配置</p>
      <div class="component" @click="holeConfig">全局配置</div>
    </div>
    <div class="navlist">
      <div class="title row-flex ac"><i class="el-icon-menu"></i>组件<p class="tip">（<i class="el-icon-star-on"></i>为容器组件）</p></div>
      <div class="component template" v-for="(n, i) in nav" :key="i" @click="selectComponent(n)" v-show="n.show">
        {{n.name}}
        <i v-if="n.component" class="contain el-icon-star-on"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import nav from "@/packages/components";
  export default {
    data() {
      return {
        nav: nav,
        info: "",
        component: "",
        detail: {},
        url: ""
      };
    },
    methods: {
      selectComponent(n) {
        this.$emit(
          "addComponent",
          JSON.stringify({
            props: {},
            ...n
          }) 
        );
      },
      holeConfig() {
        this.$emit('holeConfig');
      }
      
    }
  };
</script>

<style lang="less" scoped>
.nav {
  flex-basis: 200px;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  background-color: #fafafa;
  border-right: 1px solid #f3f3f3;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  .navlist {
    margin-bottom: 30px;
    .title {
      font-size: 16px;
      font-weight: bold;
      line-height: 50px;
      i{
        margin-right: 5px;
        color: #409eff;
      }
      .tip {
        font-size: 12px;
        i {
          color: #000;
          margin-right: 0;
        }
      }
    }
    .component {
      width: 100%;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background-color: #e8e8e8;
      cursor: pointer;
      font-size: 14px;
      position: relative;
      &:hover {
        background-color: #ddd;
        color: #409eff;
      }
      .contain {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translate(0, -50%);
      }
      &.template{
        margin-bottom: 20px;
      }
    }
  }
}
</style>
