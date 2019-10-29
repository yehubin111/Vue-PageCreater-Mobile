
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
        <div class="pic">
          <img :src="g.mainPicAddress" alt />
          <i></i>
          <p class="left">
            <span class="left-name">立省</span>
            <span class="left-num">￥{{g.marketPrice - g.memberPrice}}</span>
          </p>
        </div>
        <p class="name">{{g.productBrandName}} {{g.productName}}</p>
        <p class="price">
          黑卡秒杀价：
          <span>￥{{g.memberPrice}}</span>
        </p>
        <div class="other">
          <p class="market">市场价：¥{{g.marketPrice}}</p>
          <p class="button">立即秒杀</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fetch from "@/packages/axiosPack";
import { debounceFc } from "@/assets/common";
import { toGoodsDetial } from "@/packages/phonePlugins";
import { URL } from "@/assets/url.ts";
export default {
  name: "HsGoodsListOther",
  inject: {
    pv_inviteCode: {
      type: String
    }
  },
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
      // url: URL.goodslist,
      pageOffset: 0,
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
    if (this.topicid.trim() && this.linecount) {
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
      }, 1000);
    })(),
    getData() {
      let params = {
        topicId: this.tpid.trim(),
        pageSize: this.linecount * 2,
        pageOffset: this.pageOffset
      };
      Fetch.get('goodslist', params).then(res => {
        console.log(res);
        this.list = res.data.productsList;
      });
    },
    toGoodsDetialPage(productId) {
      toGoodsDetial(productId, this.pv_inviteCode);
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
      grid-gap: 8px;
      border-radius: 4px;
      background-color: #fff;
      overflow: hidden;
      .pic {
        padding: 17px 23px 7px;
        height: 121px;
        position: relative;
        margin-bottom: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          max-height: 100%;
        }
        i {
          width: 100%;
          position: absolute;
          height: 1px;
          bottom: 0;
          left: 0;
          background: linear-gradient(to right, #fff, #d8c5a1, #fff);
        }
        .left {
          width: 29px;
          height: 33px;
          background-color: #dac7a3;
          color: #322d26;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          left: 10px;
          top: 0;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          .left-name {
            font-size: 10px;
            margin-bottom: 6px;
            display: block;
            line-height: 9px;
          }
          .left-num {
            font-size: 8px;
            display: block;
            display: flex;
            align-items: center;
            line-height: 6px;
            font-family: PingFangSC-Semibold;
          }
        }
      }
      .name {
        font-size: 13px;
        line-height: 12px;
        margin-bottom: 8px;
        padding: 0 9px;
        color: #494238;
        overflow: hidden;
        height: 12px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        font-size: 13px;
        font-family: PingFangSC-Semibold;
        color: #494238;
        padding: 0 9px;
        line-height: 12px;
        margin-bottom: 8px;
        span {
          color: #322d26;
          font-weight: bold;
          font-family: PingFangSC-Semibold;
        }
      }
      .other {
        display: flex;
        justify-content: space-between;
        padding: 0 9px;
        margin-bottom: 13px;
        .market {
          font-size: 10px;
          color: #96805c;
          line-height: 12px;
        }
        .button {
          width: 52px;
          height: 12px;
          text-align: center;
          line-height: 12px;
          background-color: #ccb891;
          border-radius: 6px;
          color: #fff;
          font-size: 8px;
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

