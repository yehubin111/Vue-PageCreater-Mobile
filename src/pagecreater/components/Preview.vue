<template>
  <div class="preview">
    <div class="backimage">
      <p class="title">{{globalconfig.title ? globalconfig.title : '标题'}}</p>
      <!-- <div class="page" :style="globalconfig.styles">
        <module :data="data" @selectComponent="selectComponent" @delComponent="delComponent" :index="index"></module>
      </div>-->
      <iframe :src="frameurl" frameborder="0" class="page" @load="onLoad" ref="frame"></iframe>
    </div>
    <div class="createurl">
      <transition name="fade">
        <p class="resurl" id="resUrl" v-if="pageurl">
          <span>{{pageurl}}</span>
          <el-button
            type="primary"
            size="mini"
            id="copyButton"
            :data-clipboard-text="pageurl"
            circle
            icon="el-icon-document-copy"
          ></el-button>
        </p>
      </transition>
      <div>
        <el-button type="primary" slot="reference" @click="toCreate">生成网页</el-button>
        <el-button type="primary" slot="reference" @click="getConfig">查看配置</el-button>
        <el-button type="primary" slot="reference" @click="toEdit">编辑网页</el-button>
        <el-popover
          placement="top"
          width="160"
          trigger="hover" style="margin-left:10px;" v-show="pageurl">
          <div class="qrcode_box">
            <canvas id="qrcode"></canvas>
          </div>
          <el-button slot="reference">扫码查看</el-button>
        </el-popover>
        <!-- <el-button @click="remove">删除</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { textCopy, getSearch } from "@/assets/common";
import { getBaseUrl } from "@/assets/url";
// import axios from "axios";
import QRCode from "qrcode";
let BASE = getBaseUrl();
export default {
  props: {
    globalconfig: {
      type: Object,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    // index: {
    //   type: Number,
    //   required: true
    // },
    pageurl: {
      type: String
    }
  },
  components: {
    // Module
  },
  data() {
    return {
      frameurl: `${BASE["out"]}/pagecreater.html#/preview`
    };
  },
  computed: {},
  created() {
    textCopy("#copyButton");
  },
  watch: {
    pageurl(n, o) {
      // if(n) {
      //   textCopy('#copyButton');
      // }
      this.qrcode(n)
    }
  },
  methods: {
    qrcode(url) {
      // 获取页面的canvas
      var msg = document.getElementById("qrcode");
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, url, function() {
        // console.log(error)
      });
    },
    // remove() {
    //   let token = this.$store.state.qiniutoken
    //   // cf991615-8369
    //   // bucket 空间名称 easygo
    //   let entry = '<easygo>:<3cd5afcc-3a35>'
    //   let encodedEntryURI = urlsafe_base64_encode(entry)
    //   let EncodedEntryURI = ''
    //   let Authorization = 'QBox '
    //   // axios.defaults.headers.post['Content-Type'] = 'application/json';
    //   axios.post('http://p7.highstreet.top/delete','',{
    //       headers: { Platform: "2", Authorization: Authorization }
    //     }).then(res => {

    //   }).catch()
    // },
    toEdit() {
      this.$prompt("请输入需要编辑的页面地址", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /pageid=[^\#]+/,
        inputErrorMessage: "地址不正确"
      })
        .then(({ value }) => {
          let key = getSearch("pageid", decodeURIComponent(value));
          this.$emit("pageEdit", key);
        })
        .catch(() => {
          console.log("错误");
        });
    },
    onLoad() {
      this.$emit("frameOnLoad", this.$refs.frame);
    },
    getConfig() {
      this.$emit("getConfig");
    },
    toCreate() {
      this.$emit("qiniuUpload");
    }
    // selectComponent(idx) {
    //   this.$emit("selectComponent", idx);
    // },
    // delComponent(idx) {
    //   this.$emit("delComponent", idx);
    // }
  }
};
</script>
<style lang="less">
.preview .page::-webkit-scrollbar {
  display: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style lang="less" scoped>
.preview {
  flex: 1;
  display: flex;
  box-sizing: border-box;
  //   padding-top: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .createurl {
    flex-basis: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .resurl {
      line-height: 36px;
      border: 1px solid #ebebeb;
      border-radius: 5px;
      font-size: 14px;
      padding: 0 10px;
      margin-bottom: 10px;
      span {
        margin-right: 5px;
      }
    }
  }
  .backimage {
    width: 360px;
    height: 722px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 47px;
    margin-bottom: 20px;
    background-image: url(http://p7.highstreet.top/Fj2zqADnDlb0VLkfjPWErQayssMM);
    .page {
      width: 312px;
      height: 613px;
      // background-color: red;
      display: inline-block;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      overflow-y: auto;
      box-sizing: border-box;
    }
    .title {
      width: 312px;
      display: inline-block;
      font-size: 14px;
      height: 38px;
      line-height: 38px;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
