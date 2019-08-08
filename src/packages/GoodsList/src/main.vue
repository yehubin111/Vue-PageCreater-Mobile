<template>
  <div
    class="goodslist"
    :id="ref"
    :ref="ref"
    :style="{'padding': $px2vw(padding), 'background-color': backgroundColor}"
  >
    <div
      class="goodbox"
      :style="{'grid-gap': $px2vw(gap), 'grid-template-columns': columnCount == 'double'? '1fr 1fr': '1fr'}"
      v-if="list.length == 0"
    >
      <div class="default" v-for="(g,index) in defaultList" :key="index">
        <p>
          <span>图片</span>
        </p>
      </div>
    </div>
    <div
      class="goodbox-3"
      :style="{'grid-gap': $px2vw(gap), 'grid-template-columns':'1fr 1fr 1fr'}"
      v-if="columnCount == 'three'"
    >
      <div
        class="goods"
        v-for="(g,index) in list"
        :key="index"
        @click="toGoodsDetialPage(g.productId.toString())"
      >
        <div class="img">
          <img :src="g.mainPicAddress" alt />
          <div
            class="tag"
            :class="tagPosition"
            :style="{'color': tag_1_color, 'background-color': tag_1_bg}"
            v-if="tag_1_text"
          >
            <div class="label">{{tag_1_text}}</div>
            <div>
              <span class="unit">￥</span>
              <span class="price">{{g.marketPrice - g.memberPrice}}</span>
            </div>
          </div>
        </div>
        <div class="infoall">
          <p
            class="brand ff-m"
            v-if="brand"
          >{{g.productBrandNameEng}} {{g.productBrandName ? '/'+g.productBrandName : ''}}</p>
          <p
            class="name ff-l"
            v-if="productName"
          >{{g.productName ? g.productName : g.productEngName}}</p>
          <p class="price row-flex ac price_1" v-if="memberPriceStyle == '1' &&memberPriceText">
            <span class="price-tip">{{memberPriceText}}</span>
            <span class="price-unit ff-m">￥</span>
            <span class="price-text ff-m">{{g.memberPrice}}</span>
          </p>
          <p class="price row-flex ac price_2" v-if="memberPriceStyle == '2' &&memberPriceText">
            <span class="price-tip">{{memberPriceText}}</span>
            <span class="price-unit ff-m">￥</span>
            <span class="price-text ff-m">{{g.memberPrice}}</span>
          </p>
          <p class="mprice row-flex ac" v-if="marketPriceText">
            <span class="mprice-tip ff-l">{{marketPriceText}}</span>
            <span
              class="mprice-text ff-l"
              :style="{'text-decoration': marketPriceStyle ? 'line-through' : 'none'}"
            >¥{{g.marketPrice}}</span>
          </p>
          <p class="mprice row-flex ac" v-if="sellPriceText">
            <span class="mprice-tip ff-l">{{sellPriceText}}</span>
            <span class="mprice-text ff-l">¥{{g.sellPrice}}</span>
          </p>
          <div class="row-flex jc">
            <p
              class="buy-button"
              :style="{'color': buttonTextColor, 'background-color': buttonTextBg}"
              v-if="buttonText"
            >{{buttonText}}</p>
          </div>
        </div>
        <p class="nogoods" v-show="g.leftNum <= 0">
          <img src="http://p7.highstreet.top/FrdA1DNz61d6C7hJoE1EX8-DfjBy" alt />
        </p>
      </div>
    </div>
    <div
      class="goodbox"
      :style="{'grid-gap': $px2vw(gap), 'grid-template-columns':'1fr 1fr'}"
      v-if="columnCount == 'double'"
    >
      <div
        class="goods"
        v-for="(g,index) in list"
        :key="index"
        @click="toGoodsDetialPage(g.productId.toString())"
      >
        <div class="img">
          <img :src="g.mainPicAddress" alt />
          <div
            class="tag"
            :class="tagPosition"
            :style="{'color': tag_1_color, 'background-color': tag_1_bg}"
            v-if="tag_1_text"
          >
            <div class="label">{{tag_1_text}}</div>
            <div>
              <span class="unit">￥</span>
              <span class="price">{{g.marketPrice - g.memberPrice}}</span>
            </div>
          </div>
        </div>
        <div class="infoall">
          <p
            class="brand ff-m"
            v-if="brand"
          >{{g.productBrandNameEng}} {{g.productBrandName ? '/'+g.productBrandName : ''}}</p>
          <p
            class="name ff-l"
            v-if="productName"
          >{{g.productName ? g.productName : g.productEngName}}</p>
          <p class="price row-flex ac price_1" v-if="memberPriceStyle == '1' &&memberPriceText">
            <span class="price-tip">{{memberPriceText}}</span>
            <span class="price-unit ff-m">￥</span>
            <span class="price-text ff-m">{{g.memberPrice}}</span>
          </p>
          <p class="price row-flex ac price_2" v-if="memberPriceStyle == '2' &&memberPriceText">
            <span class="price-tip">{{memberPriceText}}</span>
            <span class="price-unit ff-m">￥</span>
            <span class="price-text ff-m">{{g.memberPrice}}</span>
          </p>
          <p class="mprice row-flex ac" v-if="marketPriceText">
            <span class="mprice-tip ff-l">{{marketPriceText}}</span>
            <span
              class="mprice-text ff-l"
              :style="{'text-decoration': marketPriceStyle ? 'line-through' : 'none'}"
            >¥{{g.marketPrice}}</span>
          </p>
          <p class="mprice row-flex ac" v-if="sellPriceText">
            <span class="mprice-tip ff-l">{{sellPriceText}}</span>
            <span class="mprice-text ff-l">¥{{g.sellPrice}}</span>
          </p>
          <div class="row-flex jc button-box">
            <p
              class="buy-button"
              :style="{'color': buttonTextColor, 'background-color': buttonTextBg}"
              v-if="buttonText"
            >{{buttonText}}</p>
          </div>
        </div>
        <p class="nogoods" v-show="g.leftNum <= 0">
          <img src="http://p7.highstreet.top/FrdA1DNz61d6C7hJoE1EX8-DfjBy" alt />
        </p>
      </div>
    </div>
    <div
      class="goodbox"
      :style="{'grid-gap': $px2vw(gap), 'grid-template-columns': '1fr'}"
      v-if="columnCount == 'single'"
    >
      <div
        class="goods row-flex single"
        v-for="(g,index) in list"
        :key="index"
        @click="toGoodsDetialPage(g.productId.toString())"
      >
        <div class="img">
          <img :src="g.mainPicAddress" alt />
        </div>
        <div class="infoall">
          <p
            class="brand ff-m"
            v-if="brand"
          >{{g.productBrandNameEng}} {{g.productBrandName ? '/'+g.productBrandName : ''}}</p>
          <p
            class="name ff-l"
            v-if="productName"
          >{{g.productName ? g.productName : g.productEngName}}</p>
          <p class="price row-flex ac price_1" v-if="memberPriceStyle == '1' &&memberPriceText">
            <span class="price-tip">{{memberPriceText}}</span>
            <span class="price-unit ff-m">￥</span>
            <span class="price-text ff-m">{{g.memberPrice}}</span>
          </p>
          <p class="price row-flex ac price_2" v-if="memberPriceStyle == '2' &&memberPriceText">
            <span class="price-tip">{{memberPriceText}}</span>
            <span class="price-unit ff-m">￥</span>
            <span class="price-text ff-m">{{g.memberPrice}}</span>
          </p>
          <p class="mprice row-flex ac" v-if="marketPriceText">
            <span class="mprice-tip ff-l">{{marketPriceText}}</span>
            <span
              class="mprice-text ff-l"
              :style="{'text-decoration': marketPriceStyle ? 'line-through' : 'none'}"
            >¥{{g.marketPrice}}</span>
          </p>
          <p class="mprice row-flex ac" v-if="sellPriceText">
            <span class="mprice-tip ff-l">{{sellPriceText}}</span>
            <span class="mprice-text ff-l">¥{{g.sellPrice}}</span>
          </p>
          <div class="row-flex jc">
            <p
              class="buy-button"
              :style="{'color': buttonTextColor, 'background-color': buttonTextBg}"
              v-if="buttonText"
            >{{buttonText}}</p>
          </div>
        </div>
        <p class="nogoods" v-show="g.leftNum <= 0">
          <img src="http://p7.highstreet.top/FrdA1DNz61d6C7hJoE1EX8-DfjBy" alt />
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/packages/axiosPack";
import { debounceFc } from "@/assets/common";
import { toGoodsDetial } from "@/packages/phonePlugins";
import { URL } from "@/assets/url.ts";
export default {
  name: "HsGoodsList",
  props: {
    count: {
      type: String,
      default: "4"
    },
    columnCount: {
      type: String,
      default: "double"
    },
    topicid: {
      type: String,
      default: ""
    },
    gap: {
      type: String,
      default: "0"
    },
    tag_1_text: {
      type: String,
      default: "立省"
    },
    tag_1_color: {
      type: String,
      default: "#ffffff"
    },
    tag_1_bg: {
      type: String,
      default: "#C77469"
    },
    tagPosition: {
      type: String,
      default: "left"
    },
    marketPriceText: {
      type: String,
      default: "黑卡会员"
    },
    marketPriceStyle: Boolean,
    memberPriceText: {
      type: String,
      default: "VIP会员"
    },
    memberPriceStyle: {
      type: String,
      default: "1"
    },
    sellPriceText: {
      type: String,
      default: ""
    },
    buttonText: {
      type: String,
      default: "立即购买"
    },
    buttonTextColor: {
      type: String,
      default: "#fff"
    },
    buttonTextBg: {
      type: String,
      default: "#AC5347"
    },
    padding: {
      type: String,
      default: "0 0 0"
    },
    backgroundColor: {
      type: String,
      default: ""
    },
    brand: true,
    productName: true,
    // loading: {
    //   type: Boolean,
    //   default: false
    // },
    loadOption: {
      type: Object,
      default: () => {
        return {
          loading: false,
          option: {
            count: "10"
          }
        };
      }
    },
    sloter: {
      type: Object
    },
  },
  data() {
    return {
      list: [],
      url: URL.goodslist,
      pageOffset: 0,
      pageSize: 0,
      loading: false,
      // ref: `goodslist${this.topicid}`,
      keyOption: {
        padding: { name: "边距（上 左右 下）", type: "padding" },
        backgroundColor: { name: "背景色", type: "color" },
        topicid: { name: "专题号", type: "input" },
        columnCount: { name: "列数", type: "radio" },
        count: { name: "商品数", type: "input" },
        gap: { name: "商品间隔", type: "pxinput" },
        tag_1_text: { name: "标签", type: "input" },
        tag_1_color: {
          name: "标签颜色",
          type: "color",
          placeholder: "标签颜色"
        },
        tag_1_bg: { name: "标签背景", type: "color" },
        tagPosition: {
          name: "标签位置",
          type: "radio",
          bind: ["left", "right"]
        },
        brand: { name: "品牌", type: "switch", default: true },
        productName: { name: "商品名称", type: "switch", default: true },
        marketPriceText: {
          name: "市场价(marketPrice)",
          type: "input"
        },
        marketPriceStyle: {
          name: "市场价中划线",
          type: "switch"
        },
        memberPriceText: {
          name: "黑卡价(memberPrice)",
          type: "input"
        },
        memberPriceStyle: { name: "会员价风格", type: "radio" },
        sellPriceText: {
          name: "VIP价(sellPrice)",
          type: "input"
        },
        buttonText: {
          name: "按钮",
          type: "input"
        },
        buttonTextColor: {
          name: "按钮文本颜色",
          type: "color"
        },
        buttonTextBg: {
          name: "按钮背景颜色",
          type: "color"
        },
        loadOption: {
          name: "下拉加载",
          child: {
            loading: {
              name: "是否启用下拉加载",
              default: false,
              type: "switch",
              bind: ["loadOption"]
            },
            option: {
              name: "配置项",
              accept: "loading",
              child: {
                count: { name: "每页加载数量", type: "input", default: "10" }
              }
            }
          }
        }
        // loading: { name: "是否启用下拉加载", type: "switch", bind: ['loadOption'] },
        // loadOption: {
        //   name: "下拉加载配置项",
        //   accept: 'loading',
        //   child: {
        //     count: { name: '每页加载数量', type: 'input', default: '10' }
        //   }
        // }
      }
    };
  },
  computed: {
    defaultList() {
      let arr = [];
      while (arr.length < this.count) {
        arr.push("");
      }
      return arr;
    },
    tpid() {
      return this.sloter && this.sloter.topicid ? this.sloter.topicid : this.topicid;
    },
    ref() {
      return `goodslist${this.tpid}`;
    }
  },
  mounted() {
    // 初始化获取数据
    if (this.tpid && this.count) {
      console.log("mounted");
      this.pageSize = this.count;
      this.loading = true;
      this.getData();
    }
    // 初始化添加下拉加载
    if (this.loadOption["loading"]) {
      window.removeEventListener("scroll", this.loadMore, false);
      window.addEventListener("scroll", this.loadMore, false);
    }
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    loadMore() {
      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let distance = 300; // 距离底部多少开始执行加载
      let cheight = this.$refs[this.ref].clientHeight; // load模块高度
      let ctop = this.$refs[this.ref].offsetTop; // load模块到页面顶部距离
      // console.log(this.ref, cheight, this.$refs[this.ref].offsetTop);
      if (
        scrolltop + document.documentElement.clientHeight >
        cheight + ctop - distance
      ) {
        if (this.loading) return;
        this.loading = true;
        this.pageSize = this.loadOption["option"].count;
        // this.pageOffset += parseInt(this.pageSize);
        this.getData();
      }
    },
    debounceFunc: (() => {
      return debounceFc(function() {
        this.pageSize = this.count;
        this.pageOffset = 0;
        this.list = [];
        this.getData();
      }, 1000);
    })(),
    getData() {
      console.log(this.pageSize);
      let url = this.url
        .replace("{topicId}", this.tpid.trim())
        .replace("{count}", this.pageSize.trim())
        .replace("{pageOffset}", this.pageOffset);
      axios.get(url).then(res => {
        let r = res.data.productsList;
        this.list = this.list.concat(r);
        this.pageOffset += parseInt(this.pageSize);
        if (res.count <= this.pageOffset) {
          window.removeEventListener("scroll", this.loadMore);
        } else {
          this.loading = false;
        }
      });
    },
    toGoodsDetialPage(productId) {
      toGoodsDetial(productId);
    }
  },
  watch: {
    tpid(n, o) {
      if (n == "" || this.count == "") {
        this.list = [];
        return;
      }
      this.debounceFunc();
    },
    count(n, o) {
      if (n == "" || this.tpid == "") {
        this.list = [];
        return;
      }
      this.debounceFunc();
    }
  }
};
</script>

<style lang="less" scoped>
.goodslist {
  box-sizing: border-box;
  .goodbox {
    display: grid;
    .goods {
      // height: 245px;
      background-color: #fff;
      overflow: hidden;
      position: relative;
      border-radius: 4px;
      .img {
        width: 100%;
        height: 220px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        .tag {
          position: absolute;
          z-index: 2;
          width: 29px;
          height: 33px;
          font-size: 10px;
          text-align: center;
          background-color: #f8aeae;
          border-radius: 0px 0px 3px 3px;
          &.left {
            top: 0px;
            left: 10px;
          }
          &.right {
            top: 0px;
            right: 10px;
          }
          .label {
            margin-top: 4px;
            margin-bottom: 3px;
            height: 9px;
            font-size: 10px;
          }
          .unit {
            height: 5px;
            font-size: 6px;
          }
          .price {
            height: 6px;
            font-size: 8px;
          }
        }
      }
      .infoall {
        padding: 0 5px;
        .brand {
          font-size: 14px;
          width: 100%;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 20px;
        }
        .name {
          font-size: 12px;
          width: 100%;
          height: 17px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 17px;
          margin-bottom: 3px;
        }
        .price {
          margin-bottom: 4px;
          &.price_1 {
            .price-tip {
              font-size: 13px;
              color: #000;
            }
          }
          &.price_2 {
            .price-tip {
              width: 34px;
              border: 0.5px solid #ea302b;
              border-radius: 2px;
              text-align: center;
              line-height: 11px;
              font-size: 7px;
              margin-right: 2px;
              color: #ea302b;
            }
          }
          .price-unit {
            line-height: 17px;
            font-size: 12px;
          }
          .price-text {
            line-height: 20px;
            font-size: 14px;
          }
        }
        .mprice {
          color: #777;
          .mprice-tip {
            font-size: 10px;
            line-height: 14px;
            margin-right: 3px;
          }
          .mprice-text {
            font-size: 12px;
            line-height: 17px;
          }
        }
        .button-box {
          padding: 0 10px;
        }
        .buy-button {
          margin-top: 8px;
          margin-bottom: 10px;
          width: 100%;
          height: 18px;
          line-height: 18px;
          text-align: center;
          background-color: #aaa;
          border-radius: 9px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
        .mbutton {
          display: none;
        }
      }
      .nogoods {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        img {
          width: 110px;
          height: 63px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      // 一行一列
      &.single {
        padding: 10px 5px;
        border-bottom: 0.5px solid #ddd;
        .img {
          width: 90px;
          height: 120px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .infoall {
          padding: 10px 0 0 0;
          overflow: hidden;
          .brand {
            font-size: 15px;
            line-height: 21px;
            margin-bottom: 5px;
          }
          .name {
            line-height: 17px;
            font-size: 12px;
            margin-bottom: 16px;
          }
        }
        .buy-button {
          display: block;
          width: 64px;
          height: 22px;
          background: linear-gradient(to right, #fd5a49, #e0191a);
          border-radius: 2px;
          line-height: 22px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          position: absolute;
          right: 5px;
          bottom: 20px;
        }
      }
    }
    .default {
      box-sizing: border-box;
      padding: 10px;
      p {
        height: 0;
        padding-top: 75%;
        position: relative;
        font-size: 14px;
        background-color: #fafafa;
        border: 1px dotted #ddd;
        box-sizing: border-box;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
  .goodbox-3 {
    display: grid;
    .goods {
      // height: 245px;
      background-color: #fff;
      overflow: hidden;
      position: relative;
      border-radius: 4px;
      .img {
        width: 100%;
        height: 115px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        .tag {
          position: absolute;
          z-index: 2;
          width: 20px;
          height: 23px;
          font-size: 7px;
          text-align: center;
          background-color: #f8aeae;
          border-radius: 0px 0px 3px 3px;
          &.left {
            top: 0px;
            left: 7px;
          }
          &.right {
            top: 0px;
            right: 7px;
          }
          .label {
            margin-top: 3px;
            margin-bottom: 2px;
            height: 7px;
            font-size: 7px;
          }
          .unit {
            height: 3px;
            font-size: 4px;
          }
          .price {
            height: 5px;
            font-size: 6px;
          }
        }
      }
      .infoall {
        padding: 8px 8px;
        .brand {
          font-size: 9px;
          width: 100%;
          height: 9px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 9px;
          margin-bottom: 2px;
        }
        .name {
          font-size: 8px;
          width: 100%;
          height: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 8px;
          margin-bottom: 3px;
        }
        .price {
          margin-bottom: 3px;
          &.price_1 {
            .price-tip {
              font-size: 9px;
              color: #000;
            }
          }
          &.price_2 {
            .price-tip {
              width: 34px;
              border: 0.5px solid #ea302b;
              border-radius: 2px;
              text-align: center;
              line-height: 8px;
              font-size: 7px;
              margin-right: 2px;
              color: #ea302b;
            }
          }
          .price-unit {
            line-height: 8px;
            font-size: 9px;
          }
          .price-text {
            line-height: 8px;
            font-size: 9px;
          }
        }
        .mprice {
          color: #777;
          .mprice-tip {
            font-size: 9px;
            line-height: 8px;
            margin-right: 3px;
          }
          .mprice-text {
            font-size: 9px;
            line-height: 8px;
          }
        }
        .buy-button {
          margin-top: 3px;
          width: 110px;
          height: 12px;
          line-height: 12px;
          text-align: center;
          background-color: #aaa;
          border-radius: 9px;
          font-size: 8px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
        }
        .mbutton {
          display: none;
        }
      }
      .nogoods {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        img {
          width: 110px;
          height: 63px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      // 一行一列
      &.single {
        padding: 10px 5px;
        border-bottom: 0.5px solid #ddd;
        .img {
          width: 90px;
          height: 120px;
          margin-right: 10px;
          flex-shrink: 0;
        }
        .infoall {
          padding: 10px 0 0 0;
          overflow: hidden;
          .brand {
            font-size: 15px;
            line-height: 21px;
            margin-bottom: 5px;
          }
          .name {
            line-height: 17px;
            font-size: 12px;
            margin-bottom: 16px;
          }
        }
        .buy-button {
          display: block;
          width: 64px;
          height: 22px;
          background: linear-gradient(to right, #fd5a49, #e0191a);
          border-radius: 2px;
          line-height: 22px;
          text-align: center;
          color: #fff;
          font-size: 12px;
          position: absolute;
          right: 5px;
          bottom: 20px;
        }
      }
    }
    .default {
      box-sizing: border-box;
      padding: 10px;
      p {
        height: 0;
        padding-top: 75%;
        position: relative;
        font-size: 14px;
        background-color: #fafafa;
        border: 1px dotted #ddd;
        box-sizing: border-box;
        span {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>

