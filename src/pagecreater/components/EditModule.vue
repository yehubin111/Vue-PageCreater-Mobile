<template>
  <div>
    <!-- 文本框 -->
    <template v-if="infotype == 'input'">
      <p class="title">{{infotitle}}</p>
      <el-input
        class="navinput"
        v-model="state"
        :placeholder="type"
        type="text"
        @input="editComponent"
      />
    </template>
    <!-- 单选框 -->
    <template v-if="infotype == 'radio'">
      <p class="title">{{infotitle}}</p>
      <el-radio-group v-model="state" @change="editComponent">
        <el-radio class="radio" :label="opt.key" v-for="opt in radiooptions" :key="opt.key">{{opt.value}}</el-radio>
      </el-radio-group>
    </template>
    <!-- 数字输入框 -->
    <!-- <template v-else-if="">
      <p class="title">{{info[type]}}</p>
      <el-input-number v-model="state" @change="editComponent" :min="1" label></el-input-number>
    </template> -->
    <!-- 颜色选择器 -->
    <template v-else-if="infotype == 'color'">
      <p class="title">{{infotitle}}</p>
      <el-color-picker v-model="state" @change="editComponent"></el-color-picker>
    </template>
  </div>
</template>

<script>
import { radioSelect } from "../regular";
export default {
  props: {
    type: {
      type: String
    },
    info: {
      type: Array
    },
    config: {
      type: Object
    }
  },
  data() {
    return {
      state: "",
      radiooptions: radioSelect[this.type]
    };
  },
  computed: {
    original() {
      this.state = this.config[this.type];
      return this.config[this.type];
    },
    infotype() {
      return this.info.find(v => v.key == this.type)['type'];
    },
    infotitle() {
      return this.info.find(v => v.key == this.type)['name'];
    }
  },
  watch: {
    original() {}
  },
  methods: {
    editComponent() {
      // console.log(unitKey);
      this.$emit(
        "editComponent",
        this.type,
        this.state
      );
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  line-height: 30px;
  font-weight: bold;
}
.radio {
  margin-bottom: 0px;
  line-height: 30px;
}
</style>
