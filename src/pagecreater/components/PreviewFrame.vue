<template>
  <div class="page" :style="globalconfig.styles">
    <module
      :componentsconfig="componentsconfig"
      @selectComponent="selectComponent"
      @delComponent="delComponent"
      @dragComponent="dragComponent"
      :index="index"
    ></module>
  </div>
</template>

<script>
import Module from "./Module";
export default {
  components: {
    Module
  },
  data() {
    return {
      globalconfig: {},
      componentsconfig: [],
      index: -1,
      fatherurl: location.href.replace('preview', '')
    };
  },
  mounted() {
    window.addEventListener("message", this.onMessage);
  },
  beforeDestroy: function() {
    window.removeEventListener("message", this.onMessage);
  },
  methods: {
    deepUpdate(origin, config) {
      Object.keys(config).forEach(v => {
        if (typeof config[v] == "object") {
          this.deepUpdate(origin[v], config[v]);
        } else {
          origin[v] = config[v];
        }
      });
    },
    onMessage(msg) {
      // console.group("frame 收到消息");
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
          this.componentsconfig.push(config);
          this.index = index;
          break;
        case "editComponent":
          this.deepUpdate(this.componentsconfig[index].props, config);
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
      top.postMessage({type: 'dragComponent', componentsconfig: this.componentsconfig, index: this.index }, this.fatherurl)
    },
    selectComponent(idx) {
      this.index = idx;
      top.postMessage({type: 'selectComponent', index: idx}, this.fatherurl)
    },
    delComponent(idx) {
      if (this.index == idx) {
        this.index = -1;
      } else if (this.index > idx) {
        this.index--;
      }
      this.componentsconfig.splice(idx, 1);
      top.postMessage({type: 'delComponent', index: idx}, this.fatherurl);
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
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  overflow-y: auto;
  position: absolute;
  box-sizing: border-box;
}
</style>
