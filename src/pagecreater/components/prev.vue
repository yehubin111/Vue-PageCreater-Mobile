<template>
  <div class="page" :style="globalconfig.styles">
    <div @click="getData">更新</div>
    <module
      :componentsconfig="componentsconfig"
      @selectComponent="selectComponent"
      @delComponent="delComponent"
      @dragComponent="dragComponent"
      @initComponent="initComponent"
      ref="moduleList"
      :index="index"
    ></module>
  </div>
</template>

<script>
import Module from "./Module";
import { typeJudge } from "@/assets/common";
export default {
  components: {
    Module
  },
  data() {
    return {
      globalconfig: {},
      componentsconfig: [],
      index: -1,
      fatherurl: location.href.replace("preview", "")
    };
  },
  mounted() {
    console.log("prev页面");
    this.componentsconfig = JSON.parse(
      JSON.stringify(this.$store.state.componentsconfig)
    );
    window.addEventListener("message", this.onMessage);
  },
  beforeDestroy: function() {
    window.removeEventListener("message", this.onMessage);
  },
  methods: {
    getData() {
      console.log(this.$store.state);
    },
    initComponent(info) {
      console.log("%cinit", "color: red");
      // // 排除删除引起的组件重置
      // if(this.deltime) {
      //   this.deltime = false;
      //   return;
      // }
      if (this.index == -1) return;
      this.componentsconfig[this.index].info = info;
      this.componentsconfig[this.index].props = this.$i2c(info);
      top.postMessage({ type: "initComponent", info: info }, this.fatherurl);
    },
    // deepUpdate(origin, config) {
    //   Object.keys(config).forEach(v => {
    //     if (typeof config[v] == "object") {
    //       this.deepUpdate(origin[v], config[v]);
    //     } else {
    //       origin[v] = config[v];
    //     }
    //   });
    // },
    onMessage(msg) {
      console.group("prev.vue 收到消息");
      let config = msg.data["config"];
      let index = msg.data["index"];
      let type = msg.data["type"];
      switch (type) {
        case "initGlobal":
          this.globalconfig = config;
          break;
        case "editGlobal":
          this.globalconfig = config;
          // this.deepUpdate(this.globalconfig, config);
          break;
        case "addComponent":
          // console.log(config);
          this.componentsconfig.push(config);
          this.index = index;
          break;
        case "editComponent":
          this.componentsconfig[index].props = config;
          // console.log(this.componentsconfig[index].props, config);
          // this.deepUpdate(this.componentsconfig[index].props, config);
          break;
        case "editInit":
          this.index = -1;
          this.componentsconfig = config;
          break;
      }
    },
    // 更换组件顺序回调
    dragComponent(oldindex, newindex) {
      /**
       * 拖拉排序方式
       * @case1 当前元素为拖拉元素 交换位置
       * @case2 元素从当前元素前变到后 往前推1个位置
       * @case3 元素从当前元素后变到前 往后退1个位置
       */
      if (this.index == oldindex) {
        this.index = newindex;
      } else if (this.index > oldindex && this.index <= newindex) {
        this.index--;
      } else if (this.index < oldindex && this.index >= newindex) {
        this.index++;
      }
      // console.log(this.componentsconfig);
      top.postMessage(
        {
          type: "dragComponent",
          componentsconfig: this.componentsconfig,
          index: this.index
        },
        this.fatherurl
      );
    },
    selectComponent(idx) {
      this.index = idx;
      top.postMessage({ type: "selectComponent", index: idx }, this.fatherurl);
    },
    delComponent(idx) {
      if (this.index == idx) {
        this.index = -1;
      } else if (this.index > idx) {
        this.index--;
      }
      this.componentsconfig.splice(idx, 1);
      top.postMessage({ type: "delComponent", index: idx }, this.fatherurl);
    }
  }
};
</script>
<style lang="less">
.page::-webkit-scrollbar {
  display: none;
}
</style>

<style lang="less" scoped>
.page {
  //   width: 312px;
  height: 100%;
  // background-color: red;
  display: inline-block;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  overflow-y: auto;
  position: absolute;
  box-sizing: border-box;
}
</style>
