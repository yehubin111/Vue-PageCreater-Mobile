<template>
  <div class="page" :style="globalconfig.styles">
    <module
      v-if="componentsconfig.length > 0"
      :componentsconfig="componentsconfig"
      @selectComponent="selectComponent"
      @delComponent="delComponent"
      @dragComponent="dragComponent"
      @initComponent="initComponent"
      :index="index"
    ></module>
    <!-- <el-button @click="getconfig">click</el-button> -->
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
    window.addEventListener("message", this.onMessage);
  },
  beforeDestroy: function() {
    window.removeEventListener("message", this.onMessage);
  },
  methods: {
    getconfig() {
      console.log(this.componentsconfig);
    },
    initComponent(info) {
      console.log(`%cinit ${this.index}`, "color: red");
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
      // console.group("frame 收到消息");
      let config = msg.data["config"];
      let info = msg.data["info"];
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
          this.componentsconfig.push(config);
          console.log(index);
          this.index = index;
          break;
        case "editComponent":
          let obj = this.$iLocal(this.componentsconfig, index);
          obj.props = config;
          obj.info = info;
          break;
        case "editInit":
          console.log('editInit')
          console.log(config)
          this.index = -1;
          this.componentsconfig = config;
          break;
      }
    },
    // 更换组件顺序回调
    dragComponent(type, newindex, oldindex) {
      /**
       * 拖拉排序方式
       * @case1 当前元素为拖拉元素 交换位置
       * @case2 元素从当前元素前变到后 往前推1个位置
       * @case3 元素从当前元素后变到前 往后退1个位置
       */
      console.log(oldindex, newindex);
      if (oldindex === undefined || newindex === undefined) {
        this.index = -1;
      } else if (this.index == oldindex) {
        this.index = newindex;
      } else if (this.index > oldindex && this.index <= newindex) {
        this.index--;
      } else if (this.index < oldindex && this.index >= newindex) {
        this.index++;
      }
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
      // idx 组件的索引
      this.index = idx;
      top.postMessage({ type: "selectComponent", index: idx }, this.fatherurl);
    },
    delComponent(idx) {
      this.index = -1;
      // if (this.index == idx) {
      //   this.index = -1;
      // } else if (this.index > idx) {
      //   this.index--;
      // }
      this.$iLocal(this.componentsconfig, idx, 'del');
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
  width: 312px;
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
