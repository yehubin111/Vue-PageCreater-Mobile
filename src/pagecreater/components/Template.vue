<template>
  <div class="template">
    <component-nav @addComponent="addComponent" @holeConfig="holeConfig"></component-nav>
    <preview
      :data="componentsconfig"
      :globalconfig="globalconfig"
      :index="index"
      :pageurl="pageurl"
      @delComponent="delComponent"
      @selectComponent="selectComponent"
      @getConfig="getConfig"
      @qiniuUpload="qiniuUpload"
    ></preview>
    <info-edit
      :propslist="editprops"
      :info="editinfo"
      :index="index"
      @editGlobal="editGlobal"
      @editComponent="editComponent"
    ></info-edit>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Msgsuccess } from "@/assets/plugins";
import { typeJudge, getUUID, getBaseUrl } from "@/assets/common";
import { globalInfo } from "../regular";
import axios from "axios";
import * as qiniu from 'qiniu-js';

import ComponentNav from "./ComponentNav";
import Preview from "./Preview";
import InfoEdit from "./InfoEdit";
export default {
  components: {
    ComponentNav,
    Preview,
    InfoEdit
  },
  data() {
    return {
      index: -1,
      editinfo: [],
      editprops: {},
      globalinfo: globalInfo,
      globalconfig: {},
      qiniutoken: '',
      pageurl: ''
    };
  },
  created() {
    this.globalconfig = this.initConfig(this.globalinfo);
    // 获取七牛云token
    this.getQiniuToken();
  },
  computed: {
    ...mapState(["componentsconfig"])
  },
  methods: {
    ...mapMutations([
      "ADD_COMPONENTCONFIG",
      "EDIT_COMPONENTCONFIG",
      "DEL_COMPONENTCONFIG"
    ]),
    getQiniuToken() {
      axios.get("/mgr_yuncang/common/getQiniuToken").then(res => {
        this.qiniutoken = res.data.token;
      });
    },
    qiniuUpload() {
      let me = this;
      let filename = getUUID();
      let config = {
        globalconfig: this.globalconfig,
        componentsconfig: this.componentsconfig
      };
      let file = new Blob([JSON.stringify(config)], {
        type: "application/json"
      });
      let subscription = qiniu.upload(file, filename, this.qiniutoken);
      subscription.subscribe({
        next(r) {
          console.log(r);
        },
        error(err) {
          console.log(err);
        },
        complete(r) {
          me.pageurl = `${getBaseUrl()}/pagetemplate/?pageid=${r.key}#/`;
        }
      });
    },
    initConfig(info) {
      let config = {};
      info.forEach(v => {
        if (typeJudge(v.child, "Array")) {
          this.$set(config, v.key, this.initConfig(v.child));
        } else {
          this.$set(config, v.key, v.default);
        }
      });

      // Object.keys(info).forEach(v => {
      //   if (typeJudge(info[v], "Array")) {
      //     this.$set(config, v, info[v].map(n => this.initConfig(n)));
      //   } else if (!typeJudge(info[v], "Object")) this.$set(config, v, info[v]);
      //   else {
      //     this.$set(config, v, this.initConfig(info[v]));
      //   }
      // });
      return config;
    },
    // 获取配置
    getConfig() {
      let config = {
        globalconfig: this.globalconfig,
        componentsconfig: this.componentsconfig
      };
      console.log(config);
      Msgsuccess("请打开Chrome Devtools查看");
    },
    // 添加组件
    addComponent(n) {
      let res = JSON.parse(n);
      res.props = this.initConfig(res.info);
      this.ADD_COMPONENTCONFIG(res);
      this.index = this.componentsconfig.length - 1;
      console.log(res);
      this.editprops = res.props;
      this.editinfo = res.info;
    },
    // 编辑组件
    editComponent(config, type) {
      this.EDIT_COMPONENTCONFIG({ index: this.index, config });
    },
    // 选择组件
    selectComponent(idx) {
      this.index = idx;
      if (!this.componentsconfig[this.index]) {
        this.editprops = {};
        return;
      }
      this.editprops = this.componentsconfig[this.index].props;
      this.editinfo = this.componentsconfig[this.index].info;
    },
    // 删除组件
    delComponent(idx) {
      console.log(idx);
      this.DEL_COMPONENTCONFIG(idx);
      if (this.index == idx) {
        this.selectComponent(-1);
      } else if (this.index > idx) {
        this.index--;
        this.selectComponent(this.index);
      }
    },
    // 编辑全局配置
    holeConfig() {
      this.index = -2;
      this.editprops = this.globalconfig;
      this.editinfo = this.globalinfo;
    },
    editGlobal(config) {
      this.globalconfig = Object.assign(this.globalconfig, config);
    }
  }
};
</script>

<style lang="less" scoped>
.template {
  display: flex;
  height: 100vh;
  position: absolute;
  width: 100%;
}
</style>
