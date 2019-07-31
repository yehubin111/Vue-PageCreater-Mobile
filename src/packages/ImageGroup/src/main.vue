<template>
  <div
    class="imagelist"
    :style="{'grid-template-columns': columns, 'grid-gap': gap, 'padding': padding }"
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
import axios from 'axios';
import Toast from 'vant/lib/toast';
import { toGoodsDetial, toTopic, getUserToken } from "@/packages/phonePlugins";
import AlertModule from "@/packages/components/AlertModule";
import { URL } from "@/assets/url";
export default {
  name: "HsImageGroup", 
  props: {
    count: {
      type: Number,
      default: 1
    },
    list: {
      type: Array,
      default: () => []
    },
    gap: {
      type: String,
      default: "0px"
    },
    padding: {
      type: String,
      default: "0px 0px 0px"
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
      userToken: "",
      keyOption: {
        padding: { name: '边距（上 左右 下）', type: 'padding' },
        count: { name: "数量", type: "radio", bind: ["list"] },
        gap: { name: "图片间隔", type: "input" },
        clickEvent: {
          name: "点击事件",
          type: "radio",
          bind: ["alert", "topic", "goodsdetail", "h5link", "couponid"]
        },
        list: {
          name: "图片列表",
          accept: "count",
          child: [
            {
              key: "url",
              name: "图片",
              child: {
                url: { name: "图片", default: "", type: "fileupload" },
                alert: {
                  name: "弹出框图片",
                  default: "",
                  type: "fileupload",
                  accept: "clickEvent"
                },
                alertwidth: {
                  name: "弹出框图片宽度",
                  default: "0px",
                  type: "input",
                  accept: "clickEvent"
                },
                topic: {
                  name: "专题编号",
                  default: "",
                  type: "input",
                  accept: "clickEvent"
                },
                goodsdetail: {
                  name: "商品id",
                  default: "",
                  type: "input",
                  accept: "clickEvent"
                },
                h5link: {
                  name: "h5链接",
                  default: "",
                  type: "input",
                  accept: "clickEvent"
                },
                couponid: {
                  name: "优惠券",
                  default: "",
                  type: "input",
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
  mounted() {
    if (this.clickEvent == "couponid") {
      getUserToken();
      window.jsGetAppToken = token => {
        this.userToken = token; // Android可以获取到, IOS获取为空
      };
    }
  },
  methods: {
    getCoupon(code) {
      axios.post(
        URL.coupon,
        {
          cpBatchNumber: code
        },
        {
          headers: { Platform: "2", Authorization: this.userToken }
        }
      ).then(res => {
        Toast(res.data.msg);
      });
    },
    clickCallback(i) {
      switch (this.clickEvent) {
        case "alert":
          this.alertstatus = true;
          this.alertimg = i.alert;
          this.alertwidth = i.alertwidth;
          break;
        case "topic":
          toTopic(i.topic);
          break;
        case "goodsdetail":
          toGoodsDetial(i.goodsdetail);
          break;
        case "h5link":
          location.href = i.h5link;
          break;
        case "couponid":
          this.getCoupon(i.couponid);
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

