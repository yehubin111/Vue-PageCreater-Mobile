<template>
  <div class="template">
    <component-nav @addComponent="addComponent" @holeConfig="holeConfig"></component-nav>
    <preview
      :data="componentsconfig"
      :globalconfig="globalconfig"
      :pageurl="pageurl"
      @delComponent="delComponent"
      @selectComponent="selectComponent"
      @getConfig="getConfig"
      @qiniuUpload="qiniuUpload"
      @frameOnLoad="frameOnLoad"
      @pageEdit="pageEdit"
    ></preview>
    <info-edit
      class="editmodule"
      :propslist="editprops"
      :info="editinfo"
      :index="index"
      :bgcolor="true"
      @editGlobal="editGlobal"
      @editComponent="editComponent"
    ></info-edit>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Msgsuccess } from "@/assets/plugins.ts";
import { typeJudge, getUUID, debounceFc } from "@/assets/common";
import { getBaseUrl, URL } from "@/assets/url.ts";
let BASE = getBaseUrl();
import { globalInfo } from "../regular";
import axios from "axios";
import * as qiniu from "qiniu-js";

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
      pageurl: "",
      framename: "",
      frameurl: "",
      fullscreenLoading: null,
      precomponent: null,
      baseurl: "http://p7.highstreet.top"
    };
  },
  created() {
    this.globalconfig = this.$i2c(this.globalinfo);
    // 获取七牛云token
    this.getQiniuToken();
    // 加载iframe
    this.toLoading();
  },
  mounted() {
    window.addEventListener("message", this.onMessage);
  },
  beforeDestroy: function() {
    window.removeEventListener("message", this.onMessage);
  },
  computed: {
    ...mapState(["componentsconfig", "qiniutoken"])
  },
  methods: {
    ...mapMutations([
      "ADD_COMPONENTCONFIG",
      "EDIT_COMPONENTCONFIG",
      "DEL_COMPONENTCONFIG",
      "DRAG_COMPONENTCONFIG",
      "SET_QINIUTOKEN",
      "SET_COMPONENTINFO",
      "SET_COMPONENTCONFIG",
      "EDITINIT"
    ]),
    toLoading(text) {
      this.fullscreenLoading = this.$loading({
        lock: true,
        text: text ? text : 'Loading',
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
    },
    debounceFunc: (() => {
      return debounceFc(function(argu) {
        this.framePostMessage(argu);
      }, 300);
    })(),
    pageEdit(key) {
      this.selectComponent(-1);
      let url = `${this.baseurl}/${key}`;
      axios.get(url).then(res => {
        let r = res.data;
        this.globalconfig = r.globalconfig;
        this.EDITINIT({ config: r.componentsconfig });
        this.framePostMessage({
          type: "editGlobal",
          config: this.globalconfig
        });
        this.framePostMessage({
          type: "editInit",
          config: this.componentsconfig
        });
      });
    },
    frameOnLoad(name, url) {
      this.framename = name;
      this.frameurl = url;
      this.fullscreenLoading.close();
      console.log("iframe 加载完毕");
      // 初始化传参
      this.framePostMessage({ type: "initGlobal", config: this.globalconfig });
    },
    framePostMessage(data) {
      if (!this.framename) return;
      this.framename.contentWindow.postMessage(data, this.frameurl);
    },
    onMessage(msg) {
      let index = msg.data["index"];
      let type = msg.data["type"];
      let info = msg.data["info"];
      let componentsconfig = msg.data["componentsconfig"];
      switch (type) {
        case "selectComponent":
          this.selectComponent(index);
          break;
        case "delComponent":
          this.delComponent(index);
          break;
        case "dragComponent":
          this.dragComponent(componentsconfig, index);
          break;
        case "initComponent":
          console.log("Template onMessage");
          console.log(info);
          this.initComponent(info);
          break;
      }
    },
    getQiniuToken() {
      axios.get(URL.qiniutoken).then(res => {
        this.SET_QINIUTOKEN(res.data.token);
      }); 
    },
    qiniuUpload() {
      this.toLoading('正在生成网页');
      let me = this;
      let filename = `${getUUID()}`;
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
          me.fullscreenLoading.close();
          me.pageurl = `${BASE["out"]}/pagetemplate.html?pageid=${r.key}#/`;
        }
      });
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
    // 更换组件位置
    dragComponent(config, index) {
      this.DRAG_COMPONENTCONFIG({ config });
      this.index = index;
      this.selectComponent(this.index);
    },
    // 初始化组件props信息
    initComponent(info) {
      this.editprops = this.$i2c(info);
      this.editinfo = info;
      this.SET_COMPONENTCONFIG({ index: this.index, config: this.editprops });
      this.SET_COMPONENTINFO({ index: this.index, info: this.editinfo });
    },
    // 添加组件
    addComponent(n) {
      let res = JSON.parse(n);
      this.ADD_COMPONENTCONFIG(res);
      this.index = this.componentsconfig.length - 1;
      // 发送添加组件信息给frame
      this.framePostMessage({
        type: "addComponent",
        config: res,
        index: this.index
      });
    },
    // 编辑组件
    editComponent(config) {
      this.EDIT_COMPONENTCONFIG({ index: this.index, config });
      //
      let info = this.$iLocal(this.componentsconfig, this.index).info;
      this.debounceFunc({
        type: "editComponent",
        config,
        info,
        index: this.index
      });
    },
    // 选择组件
    selectComponent(idx) {
      this.index = idx;
      if (this.index == -1) {
        this.editprops = {};
        return;
      }
      let obj = this.$iLocal(this.componentsconfig, idx);
      this.editprops = obj.props;
      this.editinfo = obj.info;
    },
    // 删除组件
    delComponent(idx) {
      this.index = -1;
      // if (this.index == idx) {
      //   this.index = -1;
      // } else if (this.index > idx) {
      //   this.index--;
      // }
      this.DEL_COMPONENTCONFIG(idx);
      this.selectComponent(this.index);
    },
    // 编辑全局配置
    holeConfig() {
      this.index = -2;
      this.editprops = this.globalconfig;
      this.editinfo = this.globalinfo;
    },
    editGlobal(config) {
      this.globalconfig = Object.assign(this.globalconfig, config);
      // 编辑全局
      this.debounceFunc({ type: "editGlobal", config: this.globalconfig });
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
.editmodule {
  padding: 10px;
  background-color: #fafafa;
  border: 1px solid #f3f3f3;
  overflow-y: auto;
}
</style>
