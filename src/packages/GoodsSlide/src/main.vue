<template>
  <div
    class="goodsslide"
    :style="{'background-color': backgroundColor, 'padding': padding }"
  >
    <div class="list" :style="{'grid-template-columns': columns, 'grid-gap': gap}" v-if="list.length == 0">
      <div class="default" v-for="(g,index) in defaultList" :key="index">
        <p>
          <span>图片</span>
        </p>
      </div>
    </div>
    <div class="list" :style="{'grid-template-columns': columns, 'grid-gap': gap}">
      <div
        class="goods"
        v-for="(g,index) in list"
        :key="index"
        @click="toGoodsDetialPage(g.productId.toString())"
      >
        <p class="img ac jc">
          <img :src="g.mainPicAddress" alt />
        </p>
        <p class="name elps">{{g.productBrandNameEng ? g.productBrandNameEng + '/' : ''}}{{g.productBrandName}}</p>
        <p class="info row-flex ac">
          <span class="tag">黑卡会员</span>
          <span class="unit ff-m">￥</span>
          <span class="price ff-m">{{g.memberPrice}}</span>
        </p>
        <p class="market l-t">￥{{g.marketPrice}}</p>
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
      default: "0px"
    },
    padding: {
      type: String,
      default: "0px 0px 0px"
    },
    backgroundColor: {
        type: String,
        default: '#fff'
    }
  },
  data() {
    return {
      list: [],
      url: URL.goodslist,
      keyOption: {
        padding: { name: '边距（上 左右 下）', type: 'padding' },
        topicid: { name: "专题号", type: "input" },
        count: { name: "数量", type: "input" },
        gap: { name: "商品间隔", type: "input" },
        backgroundColor: {name: '背景色', type: 'color'}
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
        return `repeat(${this.count}, 100px)`;
    }
  },
  mounted() {
    if (this.topicid && this.count) {
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
      let url = this.url
        .replace("{topicId}", this.topicid)
        .replace("{count}", this.count);
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
.goodsslide {
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
  .list {
    display: grid;
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
    .goods {
      width: 100%;
      .img {
        width: 100%;
        height: 132px;
        display: flex;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .name {
        line-height: 17px;
        color: #000;
        font-size: 12px;
        height: 17px;
        margin-bottom: 3px;
      }
      .info {
        margin-bottom: 2px;
        .tag {
          color: #ea302b;
          border: .5px solid #ea302b;
          font-size: 7px;
          text-align: center;
          line-height: 12px;
          width: 34px;
          border-radius: 2px;
          margin-right: 1px;
        }
        .unit {
          font-size: 10px;
          line-height: 18px;
        }
        .price {
          font-size: 12px;
          line-height: 18px;
        }
      }
      .market {
        line-height: 14px;
        color: #777;
        font-size: 10px;
      }
    }
  }
}
</style>

