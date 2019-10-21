<template>
  <div
    class="imagelist"
    :style="{'grid-template-columns': columns, 'grid-gap': $px2vw(gap), 'padding': $px2vw(padding) }"
  >
    <div class="image" v-for="(img, index) in imageList" :key="index" @click="clickCallback(img)">
      <img v-if="img.url" :src="img.url" alt />
      <div class="default" v-else>
        <p :style="{'font-size': count > 3 ? '12px' : '14px'}">
          <span>图片</span>
        </p>
      </div>
    </div>
    <alert-module :alertimg="alertimg" :alertwidth="alertwidth" :status.sync="alertstatus"></alert-module>
  </div>
</template>

<script>
import Fetch from "@/packages/axiosPack";
import Toast from "vant/lib/toast";
import { toGoodsDetial, toTopic, toScheme } from "@/packages/phonePlugins";
import { inApp } from "@/assets/common";
import AlertModule from "@/packages/components/AlertModule";
export default {
  name: "HsImageGroup",
  inject: {
    pv_inviteCode: {
      type: String
    }
  },
  props: {
    count: {
      type: Number | String,
      default: 1
    },
    list: {
      type: Array,
      default: () => {
        return [
          {
            url: "",
            alert: "",
            alertwidth: "0",
            topic: "",
            goodsdetail: "",
            h5link: "",
            couponid: "",
            weexpage: "taskcenter"
          }
        ];
      }
    },
    gap: {
      type: String,
      default: "0"
    },
    padding: {
      type: String,
      default: "0 0 0"
    },
    clickEvent: {
      type: String,
      default: "topic"
    }
  },
  components: {
    AlertModule
  },
  data() {
    return {
      alertimg: "",
      alertwidth: "",
      alertstatus: false,
      keyOption: {
        padding: { name: "边距（上 左右 下）", type: "padding" },
        count: { name: "数量", type: "radio", bind: ["list"] },
        gap: { name: "图片间隔", type: "pxinput" },
        clickEvent: {
          name: "点击事件",
          type: "radio",
          bind: ["alert", "topic", "goodsdetail", "h5link", "couponid", "weex"]
        },
        list: {
          name: "图片列表",
          accept: "count",
          child: [
            {
              key: "url",
              name: "图片",
              child: {
                url: { name: "图片", type: "fileupload" },
                alert: {
                  name: "弹出框图片",
                  type: "fileupload",
                  accept: "clickEvent"
                },
                alertwidth: {
                  name: "弹出框图片宽度",
                  type: "input",
                  accept: "clickEvent"
                },
                topic: {
                  name: "专题编号",
                  type: "input",
                  accept: "clickEvent"
                },
                goodsdetail: {
                  name: "商品id",
                  type: "input",
                  accept: "clickEvent"
                },
                h5link: {
                  name: "h5链接",
                  type: "input",
                  accept: "clickEvent"
                },
                couponid: {
                  name: "优惠券",
                  type: "input",
                  accept: "clickEvent"
                },
                weexpage: {
                  name: "跳转页面",
                  type: "radio",
                  accept: "clickEvent"
                }
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    imageList() {
      return this.list.slice(0, this.count);
    },
    columns() {
      let arr = [];
      while (arr.length < this.count) {
        arr.push("1fr");
      }
      return arr.join(" ");
    }
  },
  mounted() {},
  methods: {
    getCoupon(code) {
      let params = new FormData();
      params.append("cpBatchNumber", code);
      Fetch.post("coupon", params).then(res => {
        Toast(res.msg);
      });
    },
    clickCallback(i) {
      console.log(i);
      switch (this.clickEvent) {
        case "alert":
          this.alertstatus = true;
          this.alertimg = i.alert;
          this.alertwidth = i.alertwidth;
          break;
        case "topic":
          toTopic(i.topic.trim());
          break;
        case "goodsdetail":
          toGoodsDetial(i.goodsdetail.trim(), this.pv_inviteCode);
          break;
        case "h5link":
          location.href = i.h5link;
          break;
        case "couponid":
          this.getCoupon(i.couponid.trim());
          break;
        case "weex":
          toScheme(i.weexpage, this.pv_inviteCode);
          break;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.imagelist {
  display: grid;
  // flex-direction: row;
  grid-template-rows: 1fr;
  overflow: hidden;
  // justify-content: space-between;
  .image {
    width: 100%;
    // background-color: #fff;
    .default {
      box-sizing: border-box;
      padding: 10px;
      background-color: #fff;
      p {
        height: 0;
        padding-top: 75%;
        background-color: #fafafa;
        border: 1px dotted #ddd;
        box-sizing: border-box;
        position: relative;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    img {
      width: 100%;
      display: block;
    }
  }
}
</style>

