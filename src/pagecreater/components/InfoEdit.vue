<template>
  <div class="infoedit">
    <div class="navinfo" v-for="i in infolist" :key="i">
      <template v-if="typeof propslist[i] == 'object'">
        <p class="objtitle">{{getTitle(i)}}</p>
        <info-edit
          :propslist="config[i]"
          :info="getInfo(i)"
          :index="index"
          :type="i"
          @editGlobal="_edit"
          @editComponent="_edit"
        ></info-edit>
      </template>
      <edit-module v-else :config="config" :info="info" :type="i" @editComponent="_editInfo"></edit-module>
    </div>
  </div>
</template>

<script>
import { typeJudge } from "@/assets/common";

import EditModule from './EditModule';
export default {
  name: 'InfoEdit',
  components: {
    EditModule
  },
  props: {
    propslist: {
      type: Object | Array,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    info: {
      type: Array,
      required: true
    },
    type: {
      type: String
    }
  },
  data() {
    return {
      config: {}
    };
  },
  computed: {
    infolist() {
      this.config = Object.assign({}, this.propslist);
      return Object.keys(this.propslist);
    }
  },
  mounted() {
    
  },
  methods: {
    // valueChange(i) {

    //   console.log(i);
    // },
    getTitle(i) {
      return this.info.find(v => v.key == i)['name'];
    },
    getInfo(i) {
      return this.info.find(v => v.key == i)['child'];
    },
    typeCheck(data, type) {
      return typeJudge(data, type);
    },
    /**
     * 暂时只能处理两层嵌套
     */
    // 孙组件方法
    _edit(config, type) {
      this.config[type] = Object.assign(this.config[type], config);
      this.editComponent();
    },
    _editInfo(type, value) {
      this.config[type] = value;
      this.editComponent();
    },

    editComponent() {
      // -2为编辑全局配置
      if (this.index == -2) {
        this.$emit("editGlobal", this.config, this.type);
      } else {
        this.$emit("editComponent", this.config, this.type);
      }
    }
  },
  watch: {
    
  }
};
</script>

<style lang="less" scoped>
.infoedit {
  flex-basis: 300px;
  box-sizing: border-box;
  padding: 20px;
  height: 100%;
  background-color: #fafafa;
  border-left: 1px solid #f3f3f3;
  .navinfo {
    margin-bottom: 10px;
    .objtitle {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
