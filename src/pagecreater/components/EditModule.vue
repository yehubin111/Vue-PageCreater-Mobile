<template>
  <div class="module" v-show="!infoaccept || (infoaccept && type.indexOf(bind[infoaccept]) != -1)">
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
    <!-- 上传 -->
    <template v-if="infotype == 'fileupload'">
      <p class="title">{{infotitle}}</p>
      <file-upload :state.sync="state" @change="editComponent"></file-upload>
    </template>
    <!-- 单选框 -->
    <template v-if="infotype == 'radio'">
      <p class="title">{{infotitle}}</p>
      <el-radio-group v-model="state" @change="editComponent">
        <el-radio
          class="radio"
          :label="opt.key"
          v-for="opt in radiooptions"
          :key="opt.key"
        >{{opt.value}}</el-radio>
      </el-radio-group>
    </template>
    <!-- 数字输入框 -->
    <!-- <template v-else-if="">
      <p class="title">{{info[type]}}</p>
      <el-input-number v-model="state" @change="editComponent" :min="1" label></el-input-number>
    </template>-->
    <!-- 颜色选择器 -->
    <template v-else-if="infotype == 'color'">
      <p class="title">{{infotitle}}</p>
      <el-color-picker v-model="state" @change="editComponent"></el-color-picker>
    </template>
  </div>
</template>

<script>
import { radioSelect } from "../regular";
import FileUpload from './FileUpload';
export default {
  props: {
    type: {
      // key
      type: String | Number
    },
    info: {
      type: Object
    },
    config: {
      type: String | Number
    },
    bind: {
      type: Object
    }
  },
  components: {
    FileUpload
  },
  data() {
    return {
      state: this.config,
      radiooptions: radioSelect[this.type]
    };
  },
  methods: {
    
  },
  mounted() {
    // console.log(this.config);
    // console.log(this.info);
    // console.log(this.type);
  },
  computed: {
    original() {
      // console.log(this.type, this.config);
      this.state = this.config;
      return this.config;
    },
    infotype() {
      return this.info["type"];
    },
    infotitle() {
      return this.info["name"];
    },
    infoaccept() {
      return this.info["accept"];
    }
  },
  watch: {
    original() {}
  },
  methods: {
    editComponent() {
      // console.log(this.state);
      this.$emit("editComponent", this.type, this.state);
    }
  }
};
</script>

<style lang="less" scoped>
.module {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
}
.title {
  line-height: 30px;
  font-weight: bold;
}
.radio {
  margin-bottom: 0px;
  line-height: 30px;
}
</style>
