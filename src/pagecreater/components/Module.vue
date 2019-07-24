<template>
  <draggable tag="div" class="box" :list="componentsconfig" group="people" @change="dragModule" :options="dragOptions">
    <div
      class="module"
      :class="{on: index == i}"
      @click="selectComponent(i)"
      v-for="(temp, i) in componentsconfig"
      :key="i"
    >
      <component :is="temp.moduleName" v-bind="temp.props" @initConfig="initConfig"></component>
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
    componentsconfig: {
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
  data() {
    return {
      dragOptions: {
        animation: 200,
        group: 'description',
        // disabled: !this.edit,
        ghostClass: 'dragger-on'
      }
    }
  },
  methods: {
    initConfig(info) {
      console.log(info);
      // this.$emit('initComponent', info);
    },
    selectComponent(i) {
      // console.log(this.$refs);
      this.$emit("selectComponent", i);
    },
    dragModule({ moved }) {
      this.$emit("dragComponent", moved.oldIndex, moved.newIndex);
    },
    delComponent(i) {
      this.$emit("delComponent", i);
    }
  }
};
</script>

<style lang="less" scoped>
.dragger-on {
  opacity: .5;
  background-color: #c8ebfb;
}
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
