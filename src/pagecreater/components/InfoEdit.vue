<template>
  <div class="infoedit">
    <div class="commonedit" :style="{'background-color': bgcolor ? '#f3f3f3':'#fff'}">
      <div class="navinfo" v-for="i in infolist" :key="i">
        <!-- <template v-if="typeJudge(propslist[i], 'Array')">
          <p class="objtitle">{{getTitle(i)}}</p>
          <info-edit
            :propslist="config[i]"
            :info="getInfo(i)"
            :index="index"
            :type="i"
            :bind="bindconfig"
            :accept="getAccept(i)"
            :bgcolor="!bgcolor"
            @editGlobal="_edit"
            @editComponent="_edit"
          ></info-edit>
        </template>-->
        <template v-if="typeof propslist[i] == 'object'">
          <p class="objtitle">{{getTitle(i)}}</p>
          <info-edit
            :propslist="config[i]"
            :info="getInfo(i)"
            :index="index"
            :type="i"
            :bind="bindconfig"
            :accept="getAccept(i)"
            :bgcolor="!bgcolor"
            @editGlobal="_edit"
            @editComponent="_edit"
          ></info-edit>
        </template>
        <edit-module
          v-else
          :config="config[i]"
          :info="info[i]"
          :type="i"
          @editComponent="_editInfo"
          :bind="bind"
        ></edit-module>
      </div>
    </div>
  </div>
</template>

<script>
import { typeJudge } from "@/assets/common";

import EditModule from "./EditModule";
export default {
  name: "InfoEdit",
  components: {
    EditModule
  },
  props: {
    // 当层props对象
    propslist: {
      type: Object | Array,
      required: true
    },
    // 全局配置 or 组件配置
    index: {
      type: Number,
      required: true
    },
    // 当层info对象
    info: {
      type: Object | Array,
      required: true
    },
    // key
    type: {
      type: String
    },
    // 斑马色
    bgcolor: {
      type: Boolean
    },
    // 向下影响参数
    bind: {
      type: Object,
      default: () => ({})
    },
    // 向上受影响参数
    accept: {
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
      this.config = this.propslist;
      console.log("props:", this.propslist);
      console.log("info:", this.info);
      console.log("accept:", this.accept);
      console.log("bindconfig:", this.bindconfig);

      let maxcount = Object.keys(this.propslist).length;
      if (this.bindconfig.hasOwnProperty(this.accept)) {
        if (Array.isArray(this.propslist)) {
          let initinfo = this.info[0];
          let initprop = this.$i2c(this.info, "Array")[0];
          maxcount = this.bindconfig[this.accept];
          if (this.propslist.length > maxcount) {
            this.propslist.length = maxcount;
            this.info.length = maxcount;
          } else {
            while (this.propslist.length < maxcount) {
              this.propslist.push(JSON.parse(JSON.stringify(initprop)));
              this.info.push(JSON.parse(JSON.stringify(initinfo)));
            }
          }
        } else {
          maxcount = Number(this.bindconfig[this.accept]);
        }
      }
      let i = Object.keys(this.propslist).slice(0, maxcount);

      // // maxcount bind
      // let i = Object.keys(this.propslist);
      // let maxcount = i.length;
      // if (Array.isArray(this.info)) {
      //   maxcount = this.bindconfig[this.accept];
      // }
      // let tl = i[0];
      // while (i.length < maxcount) {
      //   i.push(tl);
      //   this.propslist.push(this.propslist[0]);
      //   this.info.push(this.info[0]);
      // }
      console.log(i);
      return i.slice(0, i.length);
    },
    bindconfig() {
      // 提取带有绑定的数据props
      let bindinfo = Object.entries(this.info)
        .filter(v => v[1].bind)
        .map(v => v[0]);
      let obj = {};
      bindinfo.forEach(v => {
        obj[v] = this.config[v];
      });
      return Object.assign({}, this.bind, obj);
    }
  },
  mounted() {},
  methods: {
    // valueChange(i) {

    //   console.log(i);
    // },
    getTitle(i) {
      return this.info[i]["name"];
    },
    getInfo(i) {
      if (typeof this.config[i] == "object") return this.info[i]["child"];
      else return this.info[i];
    },
    getAccept(i) {
      return this.info[i]["accept"];
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
  watch: {}
};
</script>

<style lang="less" scoped>
.infoedit {
  flex-basis: 360px;
  box-sizing: border-box;
  // padding: 20px;
  height: 100%;
  // background-color: #fafafa;
  // border-left: 1px solid #f3f3f3;
  .commonedit {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 10px;
    .navinfo {
      margin-bottom: 10px;
      .objtitle {
        font-size: 12px;
        line-height: 30px;
      }
    }
  }
}
</style>
