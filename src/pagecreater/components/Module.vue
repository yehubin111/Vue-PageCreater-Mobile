<template>
  <draggable
    tag="div"
    class="dragBox"
    :class="{
      'dragAreaEdit': true
    }"
    :list="componentsconfig"
    @start="drag = true"
    @end="drag = false"
    group="drag"
    @change="dragModule"
    :options="dragOptions"
  >
    <div
      class="module"
      :class="{on: index.toString() === i.toString()}"
      @click.stop="selectComponent(i)"
      v-for="(temp, i) in componentsconfig"
      :key="i"
    >
      <component :is="temp.moduleName" v-bind="temp.props" @initConfig="initConfig">
        <module
          v-if="temp.component"
          :componentsconfig="temp.component"
          :index="childindex"
          :cindex="cindex !== undefined && cindex !== null?`${cindex}-${i}`:i"
          @dragComponent="_dragModule"
          @delComponent="_delComponent"
          @selectComponent="_selectComponent"
        ></module>
      </component>
      <div class="modulectrl">
        <i class="el-icon-delete" style="color: #fff" @click.stop="delComponent(i)"></i>
      </div>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable/src/vuedraggable";
export default {
  name: "Module",
  props: {
    componentsconfig: {
      type: Array,
      required: true
    },
    index: {
      type: Number | String,
      required: true
    },
    cindex: {
      type: Number | String
    }
  },
  components: {
    draggable
  },
  data() {
    return {
      drag: false,
      del: false,
      dragOptions: {
        animation: 200,
        group: "description",
        // disabled: !this.edit,
        ghostClass: "dragger-on"
      }
    };
  },
  mounted() {
    console.log(this.componentsconfig);
  },
  computed: {
    childindex() {
      return this.index.toString().substring(2);
    }
  },
  methods: {
    initConfig(info) {
      // console.log(info);
      if (!this.drag && !this.del) this.$emit("initComponent", info);
    },
    _selectComponent(i) {
      console.log(i);
      this.$emit("selectComponent", i);
    },
    selectComponent(i) {
      // console.log(this.$refs);
      this.$emit(
        "selectComponent",
        this.cindex !== undefined && this.cindex !== null
          ? `${this.cindex}-${i}`
          : i
      );
    },
    _dragModule(type, n) {
      console.log(type, n);
      // console.log('child drag');
      this.$emit("dragComponent", type, n);
    },
    dragModule({ added, removed, moved }) {
      let type = "";
      let act = null;
      if (added) {
        type = "add";
        act = added;
      } else if (removed) {
        type = "remove";
        act = removed;
      } else {
        type = "move";
        act = moved;
      }
      console.log(type);
      if (act.newIndex !== undefined)
        this.$emit(
          "dragComponent",
          type,
          this.cindex !== undefined ? `${this.cindex}-${act.newIndex}` : act.newIndex
        );
      // this.$emit("dragComponent", moved.oldIndex, moved.newIndex);
    },
    _delComponent(i) {
      this.$emit("delComponent", i);
    },
    delComponent(i) {
      let me = this;
      this.del = true;
      setTimeout(function() {
        me.del = false;
      }, 300);
      this.$emit("delComponent", i);
    }
  }
};
</script>

<style lang="less" scoped>
.dragAreaEdit {
  &:after {
    content: "可拖入组件";
    display: block;
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    box-sizing: border-box;
    border: 1px dashed #ddd;
    flex: 0 0 100%;
  }
}
.dragger-on {
  opacity: 0.5;
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
    border: 1px dashed #f00;
  }
}
.page > .dragBox::after {
  display: none;
}
</style>
