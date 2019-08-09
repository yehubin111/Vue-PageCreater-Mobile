<template>
  <div class="module" v-show="!infoaccept || (infoaccept && type.indexOf(bind[infoaccept]) != -1)">
    <!-- 边距 -->
    <template v-if="infotype == 'padding'">
      <p class="title">{{infotitle}}</p>
      <div class="padding">
        <div class="row-flex ac">
        <el-input
          class="navinput"
          v-model="paddingLeft"
          :placeholder="type"
          type="text"
          @input="editComponent"
        />
        <span class="unit">px</span>
        </div>
        <div class="row-flex ac">
        <el-input
          class="navinput"
          v-model="paddingBoth"
          :placeholder="type"
          type="text"
          @input="editComponent"
        />
        <span class="unit">px</span>
        </div>
        <div class="row-flex ac">
        <el-input
          class="navinput"
          v-model="paddingRight"
          :placeholder="type"
          type="text"
          @input="editComponent"
        />
        <span class="unit">px</span>
        </div>
      </div>
    </template>
    <!-- 尺寸文本框 -->
    <template v-if="infotype == 'pxinput'">
      <p class="title">{{infotitle}}</p>
      <div class="inputline row-flex ac">
        <el-input
          class="navinput"
          v-model="state"
          :placeholder="type"
          type="text"
          @input="editComponent"
        />
        <span class="unit">px</span>
      </div>
    </template>
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
    <!-- 开关 -->
    <template v-if="infotype == 'switch'">
      <p class="title">{{infotitle}}</p>
      <el-switch
        v-model="state"
        :active-value="true"
        :inactive-value="false"
        @change="editComponent"
      ></el-switch>
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
import FileUpload from "./FileUpload";
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
      radiooptions: radioSelect[this.type],
      paddingLeft: "",
      paddingBoth: "",
      paddingRight: ""
    };
  },
  methods: {},
  mounted() {
    // console.log(this.config);
    // console.log(this.info);
    // console.log(this.type);
  },
  computed: {
    original() {
      // console.log(this.type, this.config);
      this.state = this.config;
      if (this.infotype == "padding") {
        this.paddingLeft = this.state.split(" ")[0];
        this.paddingBoth = this.state.split(" ")[1];
        this.paddingRight = this.state.split(" ")[2];
      }

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
      let state = "";
      switch (this.infotype) {
        case "padding":
          state = `${this.paddingLeft} ${this.paddingBoth} ${this.paddingRight}`;
          break;
        case "pxinput":
          state = this.state;
          break;
        default:
          state = this.state;
          break;
      }
      this.$emit(
        "editComponent",
        this.type,
        typeof state == "string" ? state.trim() : state
      );
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
  .inputline {
    .unit {
      font-size: 14px;
      margin-left: 5px;
    }
  }
}
.padding {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  grid-gap: 10px;
  .unit {
      font-size: 14px;
      margin-left: 5px;
  }
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
