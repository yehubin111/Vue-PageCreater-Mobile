<template>
  <div
    class="outer"
    :style="{'padding-top': $px2vw(paddingTop), 'padding-bottom': $px2vw(paddingBottom), 'background-color': backgroundColor}"
  >
    <!-- <div class="goodsbox" :style="{height: list.length > 0?'52.7vw':'auto' }"> -->
    <div class="goodsbox">
      <div
        class="goodsslide"
        :style="{'padding-left': $px2vw(paddingLeft)}"
      >
      <!-- <div
        class="goodsslide"
        :style="{'padding-bottom': list.length > 0?'5.33333vw':'0px', 'padding-left': $px2vw(paddingLeft)}"
      > -->
        <div class="goodsscroll">
          <div
            class="list"
            :style="{'grid-template-columns': columns, 'grid-gap': $px2vw(gap)}"
            v-if="list.length == 0"
          >
            <div class="default" v-for="(g,index) in defaultList" :key="index">
              <p>
                <span>图片</span>
              </p>
            </div>
          </div>
          <div class="list" :style="{'grid-template-columns': columns, 'grid-gap': $px2vw(gap)}">
            <div
              class="goods"
              v-for="(g,index) in list"
              :key="index"
              @click="toGoodsDetialPage(g.productId.toString())"
            >
              <div class="img ac jc">
                <img v-load :data-src="g.mainPicAddress" src="http://p7.highstreet.top/FqKVW8g19S87vqKepWTLdq6S16eX" alt />
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
              <div class="product-info">
                <p
                  class="brand elps"
                  v-if="brand"
                >{{g.productBrandNameEng}} {{g.productBrandName ? '/'+g.productBrandName : ''}}</p>
                <p
                  class="name ff-l elps"
                  v-if="productName"
                >{{g.productName ? g.productName : g.productEngName}}</p>
                <p class="info row-flex ac price_1" v-if="memberPriceStyle == '1' &&memberPriceText">
                  <span class="label">{{memberPriceText}}</span>
                  <span class="unit ff-m">￥</span>
                  <span class="price ff-m">{{g.memberPrice}}</span>
                </p>
                <p class="info row-flex ac price_2" v-if="memberPriceStyle == '2' &&memberPriceText">
                  <span class="tag" :class="{'width': memberPriceText.length > 5 ? true : false}">{{memberPriceText}}</span>
                  <span class="unit ff-m">￥</span>
                  <span class="price ff-m">{{g.memberPrice}}</span>
                </p>
                <p class="info market" :style="{'color': marketPriceColor}">
                  <span class="tag">{{marketPriceText}}</span>
                  <span class="unit ff-m">￥</span>
                  <span
                    class="price ff-l"
                    :style="{'text-decoration': marketPriceStyle ? 'line-through' : 'none'}"
                  >{{g.marketPrice}}</span>
                </p>
                <p class="info mprice row-flex ac" v-if="sellPriceText">
                  <span class="mprice-tip ff-l">{{sellPriceText}}</span>
                  <span class="mprice-text ff-l">¥{{g.sellPrice}}</span>
                </p>
                <!-- <p class="market l-t" v-if="marketPriceText">￥{{g.marketPrice}}</p> -->
                <div class="info row-flex jc button-box">
                  <p
                    class="buy-button"
                    :style="{'color': buttonTextColor, 'background-color': buttonTextBg}"
                    v-if="buttonText"
                  >{{buttonText}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  name: "HsGoodsSlide",
  props: {
    count: {
      type: String,
      default: "4"
    },
    topicid: {
      type: String,
      default: ""
    },
    gap: {
      type: String,
      default: "4"
    },
    padding: {
      type: String,
      default: "4 4 4"
    },
    backgroundColor: {
      type: String,
      default: "#fff"
    },
    brand: {
      type: Boolean,
      default: true
    },
    productName: {
      type: Boolean,
      default: false
    },
    tag_1_text: {
      type: String,
      default: ""
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
      default: ""
    },
    marketPriceColor: {
      type: String,
      default: "#000"
    },
    marketPriceStyle: {
      type: Boolean,
      default: true
    },
    memberPriceText: {
      type: String,
      default: "黑卡会员"
    },
    memberPriceStyle: {
      type: String,
      default: "2"
    },
    sellPriceText: {
      type: String,
      default: ""
    },
    buttonText: {
      type: String,
      default: ""
    },
    buttonTextColor: {
      type: String,
      default: "#fff"
    },
    buttonTextBg: {
      type: String,
      default: "#AC5347"
    }
  },
  data() {
    return {
      list: [],
      url: URL.goodslist,
      pageOffset: 0,
      keyOption: {
        padding: { name: "边距（上 左右 下）", type: "padding" },
        topicid: { name: "专题号", type: "input" },
        count: { name: "商品数量", type: "input" },
        gap: { name: "商品间隔", type: "pxinput" },
        backgroundColor: { name: "背景色", type: "color" },
        brand: { name: "品牌", type: "switch", default: true },
        productName: { name: "商品名称", type: "switch", default: true },
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
        marketPriceText: {
          name: "市场价(marketPrice)",
          type: "input"
        },
        marketPriceColor: {
          name: "市场价颜色",
          type: "color"
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
        }
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
    columns() {
      return `repeat(${this.count}, ${this.$px2vw(100)})`;
    },
    paddingTop() {
      return this.padding.split(" ")[0];
    },
    paddingBottom() {
      return this.padding.split(" ")[2];
    },
    paddingLeft() {
      return this.padding.split(" ")[1];
    }
  },
  mounted() {
    if (this.topicid.trim() && this.count) {
      this.getData();
    }
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    debounceFunc: (() => {
      return debounceFc(function() {
        this.getData();
      }, 300);
    })(),
    // debounceFunc() {
    //   if (this.timeout) {
    //     clearTimeout(this.timeout);
    //   }
    //   this.timeout = setTimeout(() => {
    //     this.getData();
    //   }, 300);
    // },
    getData() {
      let url = this.url
        .replace("{pageOffset}", this.pageOffset)
        .replace("{topicId}", this.topicid.trim())
        .replace("{count}", this.count.trim());
      axios.get(url).then(res => {
        console.log(res);
        this.list = res.data.productsList;
        this.list.forEach(v => {
          v.mainPicAddress += '?imageView2/0/w/400';
        })
      });
    },
    toGoodsDetialPage(productId) {
      toGoodsDetial(productId);
    }
  },
  watch: {
    topicid(n, o) {
      if (n == "" || this.count == "") {
        this.list = [];
        return;
      }
      this.debounceFunc();
    },
    count(n, o) {
      if (n == "" || this.topicid == "") {
        this.list = [];
        return;
      }
      this.debounceFunc();
    }
  }
};
</script>

<style lang="less" scoped>
.goodsbox {
  overflow-y: hidden;
  .goodsslide {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    .goodsscroll {
      .list {
        display: grid;
        .default {
          box-sizing: border-box;
          padding: 10px;
          background-color: #fff;
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
        .goods {
          width: 100%;
          background-color: #fff;
          border-radius: 4px;
          overflow: hidden;
          .img {
            width: 100%;
            height: 132px;
            display: flex;
            position: relative;
            img {
              max-width: 100%;
              max-height: 100%;
            }
            .tag {
              position: absolute;
              z-index: 2;
              width: 18px;
              height: 20px;
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
                margin-top: 2px;
                margin-bottom: 1px;
                height: 6px;
                font-size: 6px;
              }
              .unit {
                height: 3px;
                font-size: 3px;
              }
              .price {
                height: 4px;
                font-size: 5px;
              }
            }
          }
          .product-info{
            padding: 8px 0px;
            .brand {
              padding: 0px 8px;
              // height: 9px;
              // line-height: 8px;
              color: #000;
              font-size: 12px;
              // margin-bottom: 3px;
            }
            .name {
              padding: 0px 8px;
              height: 12px;
              color: #000;
              font-size: 10px;
              margin-bottom: 5px;
            }
            .info {
              padding: 0px 8px;
              // margin-bottom: 2px;
            }
            .price_1 {
              height: 10px;
              margin-bottom: 1px;
              .label{
                font-size: 8px;
              }
              .unit {
                font-size: 8px;
              }
              .price {
                font-size: 12px;
              }
            }
            .price_2 {
              margin-bottom: 1px;
              .tag {
                color: #ea302b;
                border: 0.5px solid #ea302b;
                font-size: 7px;
                text-align: center;
                line-height: 10px;
                // width: 37px;
                height: 10px;
                padding:0px 2px;
                border-radius: 2px;
                margin-right: 1px;
                &.width{
                  width: 36px;
                  overflow: hidden;
                }
              }
            }
            .market {
              // line-height: 8px;
              color: #777;
              font-size: 8px;
              margin-bottom: 1px;
              .tag{
                font-size: 8px;
              } 
              .unit{
                font-size: 8px;
              }
              .price{
                font-size: 10px;
                font-weight: normal;
              }
            }
            .mprice{
              .mprice-tip{
                font-size: 10px;
              }
              .mprice-text{
                font-size: 10px;
              }
            }
            .button-box {
              padding: 0 8px;
            }
            .buy-button {
              // margin-top: 8px;
              // margin-bottom: 10px;
              width: 100%;
              height: 11px;
              line-height: 11px;
              text-align: center;
              background-color: #aaa;
              border-radius: 5px;
              font-size: 8px;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
          }
          
        }
      }
    }
  }
}
</style>

