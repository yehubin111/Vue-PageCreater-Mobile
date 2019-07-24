<template>
  <div
    class="goodslist"
    :style="{'padding-left': bothPadding,'padding-right': bothPadding,'margin-top': marginTop}"
  >
    <div class="goodbox" :style="{'grid-gap': gap}" v-if="list.length == 0">
      <div class="default" v-for="(g,index) in defaultList" :key="index">
        <p>
          <span>图片</span>
        </p>
      </div>
    </div>
    <div class="goodbox" :style="{'grid-gap': gap}" v-else>
      <div
        class="goods"
        v-for="(g,index) in list"
        :key="index"
        @click="toGoodsDetialPage(g.productId.toString())"
      >
        <div class="img">
          <img :src="g.mainPicAddress" alt />
          <div class="tip">
            <p>立省<br/><span>￥3000</span></p>
          </div>
          <p class="line"></p>
        </div>
        <div class="infoall">
          <div class="info">
            <p class="name">{{g.productName}}</p>
            <p class="price">
              黑卡抢购价
              <span>¥{{g.memberPrice}}</span>
            </p>
            <p class="mprice">
              市场价
              <span>¥{{g.marketPrice}}</span>
            </p>
          </div>
          <div class="button">
            <span>立即抢购</span>
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
import axios from "axios";
import { debounceFc } from "@/assets/common";
import { toGoodsDetial } from "@/packages/phonePlugins";
import { URL } from "@/assets/url";
export default {
  name: "HsGoodsList",
  props: {
    linecount: {
      type: String,
      default: "1"
    },
    topicid: {
      type: String,
      default: ""
    },
    gap: {
      type: String,
      default: "0px"
    },
    bothPadding: {
      type: String,
      default: "0px"
    },
    marginTop: {
      type: String,
      default: "0px"
    }
  },
  data() {
    return {
      list: [],
      url: URL.goodslist,
      keyOption: {
        bothPadding: { name: "左右边距", type: "input" },
        marginTop: { name: "上边距", type: "input" },
        topicid: { name: "专题号", type: "input" },
        linecount: { name: "行数（一行两个）", type: "input" },
        gap: { name: "商品间隔", type: "input" }
      }
    };
  },
  computed: {
    defaultList() {
      let arr = [];
      while (arr.length < this.linecount * 2) {
        arr.push("");
      }
      return arr;
    }
  },
  mounted() {
    if (this.topicid && this.linecount) {
      this.debounceFunc();
    }
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {
    debounceFunc: (() => {
      return debounceFc(function() {
        this.getData();
      }, 1000);
    })(),
    getData() {
      let url = this.url
        .replace("{topicId}", this.topicid)
        .replace("{count}", this.linecount * 2);
      axios.get(url).then(res => {
        console.log(res);
        this.list = res.data.data.productsList;
      });
    },
    toGoodsDetialPage(productId) {
      toGoodsDetial(productId);
    }
  },
  watch: {
    topicid(n, o) {
      if (n == "" || this.linecount == "") {
        this.list = [];
        return;
      }
      this.debounceFunc();
    },
    linecount(n, o) {
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
.goodslist {
  box-sizing: border-box;
  .goodbox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    .goods {
      // height: 245px;
      padding-bottom: 16px;
      background-color: #fff;
      overflow: hidden;
      position: relative;
      .img {
        width: 100%;
        height: 142px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 14px;
        position: relative;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        .line {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, #fff, #D8C5A1, #fff);
          position: absolute;
          bottom: 0;
          left: 0;
        }
        .tip {
          width: 29px;
          height: 33px;
          position: absolute;
          font-size: 10px;
          left: 10px;
          top: 0px;
          background-color: #D6C39F;
          // background: url("http://p7.highstreet.top/FsM8MsW7yfj04v50PBbF-zbbou00")
          //   0 0 no-repeat;
          // background-size: 50px auto;
          text-align: center;
          color: #322D26;
          span {
            font-size: 8px;
            color: #322D26;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            text-align: center;
            line-height: 17px;
          }
        }
      }
      .infoall {
        padding: 0 6px;
        display: flex;
        align-items: center;
        .info {
          margin-right: 7px;
          flex-grow: 1;
          overflow: hidden;
          text-align: left;
          .name {
            font-size: 13px;
            color: #494238;
            width: 100%;
            height: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 16px;
            margin-bottom: 3px;
            font-family: PingFangSC-Light;
          }
          .price {
            font-size: 12px;
            color: #222;
            line-height: 17px;
            margin-bottom: 3px;
            font-family: PingFangSC-Medium;
            span {
              font-size: 12px;
              font-family: PingFangSC-Medium;
            }
          }
          .mprice {
            font-size: 10px;
            color: #929292;
            line-height: 14px;
            font-family: PingFangSC-Light;
            span {
              text-decoration: line-through;
            }
          }
        }
        .button {
          flex-basis: 40px;
          flex-shrink: 0;
          width: 40px;
          height: 46px;
          background: linear-gradient(#ff7a5c, #f9314d);
          display: flex;
          align-items: center;
          justify-content: center;
          span {
            color: #fff;
            font-size: 11px;
            text-align: center;
            display: inline-block;
            padding: 0 5px;
          }
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
    }
    &.inventory {
      .goods {
        .tip {
          width: 45px;
          height: 28px;
          background: url("http://p7.highstreet.top/FoCMUKL94IhJNkghzz7CwnKnBl2l")
            0 0 no-repeat;
          background-size: 45px auto;
          text-align: center;
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

