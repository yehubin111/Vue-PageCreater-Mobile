<template>
  <draggable tag="div" class="box" :list="data" group="people" @change="dragModule">
    <div
      class="module"
      :class="{on: index == i}"
      @click="selectComponent(i)"
      v-for="(temp, i) in data"
      :key="i"
    >
      <component :is="temp.moduleName" v-bind="temp.props"></component>
      <div class="modulectrl">
        <i class="el-icon-delete" style="color: #fff" @click.stop="delComponent(i)"></i>
      </div>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable/src/vuedraggable";
export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  components: {
    draggable
  },
  methods: {
    selectComponent(i) {
      this.$emit("selectComponent", i);
    },
    dragModule({ moved }) {
      let i = 0;
      if (this.index == moved.newIndex) {
        i = moved.oldIndex;
      }
      if (this.index == moved.oldIndex) {
        i = moved.newIndex;
      }
      this.selectComponent(i);
    },
    delComponent(i) {
      this.$emit("delComponent", i);
    }
  }
};
</script>

<style lang="less" scoped>
.module {
  position: relative;
  .modulectrl {
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 0 10px;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    i {
      cursor: pointer;
    }
  }
  &.on {
    box-sizing: border-box;
    border: 1px dotted #f00;
  }
}
</style>
