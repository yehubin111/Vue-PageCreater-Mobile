<template>
  <div
    class="goodslist"
    :id="ref"
    :ref="ref"
    :style="{'padding': padding, 'background-color': backgroundColor}"
  >
    <div
      class="goodbox"
      :style="{'grid-gap': gap, 'grid-template-columns': columnCount == 'double'? '1fr 1fr': '1fr'}"
      v-if="list.length == 0"
    >
      <div class="default" v-for="(g,index) in defaultList" :key="index">
        <p>
          <span>图片</span>
        </p>
      </div>
    </div>
    <div
      class="goodbox"
      :style="{'grid-gap': gap, 'grid-template-columns': columnCount == 'double'? '1fr 1fr': '1fr'}"
      v-else
    >
      <div
        class="goods"
        :class="{'row-flex single':columnCount == 'single'}"
        v-for="(g,index) in list"
        :key="index"
        @click="toGoodsDetialPage(g.productId.toString())"
      >
        <div class="img">
          <img :src="g.mainPicAddress" alt />
        </div>
        <div class="infoall">
          <p class="brand ff-m">{{g.productBrandName}}</p>
          <p class="name ff-l">{{g.productName}}</p>
          <p class="price row-flex ac">
            <span class="price-tip">黑卡会员</span>
            <span class="price-unit ff-m">￥</span>
            <span class="price-text ff-m">{{g.memberPrice}}</span>
          </p>
          <p class="mprice row-flex ac">
            <span class="mprice-tip ff-l">VIP会员</span>
            <span class="mprice-text ff-l">¥{{g.marketPrice}}</span>
          </p>
          <p class="mbutton">立即购买</p>
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
      default: "0px"
    },
    padding: {
      type: String,
      default: "0px 0px 0px"
    },
    backgroundColor: {
      type: String,
      default: ""
    },
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
    }
  },
  data() {
    return {
      list: [],
      url: URL.goodslist,
      pageOffset: 0,
      pageSize: 0,
      loading: false,
      ref: `goodslist${this.topicid}`,
      keyOption: {
        padding: { name: "边距（上 左右 下）", type: "padding" },
        backgroundColor: { name: "背景色", type: "color" },
        topicid: { name: "专题号", type: "input" },
        columnCount: { name: "列数", type: "radio" },
        count: { name: "商品数", type: "input" },
        gap: { name: "商品间隔", type: "input" },
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
    }
  },
  mounted() {
    // 初始化获取数据
    if (this.topicid && this.count) {
      console.log('mounted');
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
        .replace("{topicId}", this.topicid.trim())
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
.goodslist {
  box-sizing: border-box;
  .goodbox {
    display: grid;
    .goods {
      // height: 245px;
      background-color: #fff;
      overflow: hidden;
      position: relative;
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
        .mbutton {
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

