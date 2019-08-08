<template>
  <div class="floatnav" :ref="ref" :id="ref">
    <div class="floatbox" :style="{height: $px2vw(baseInfo.height)}">
      <ul
        class="float"
        :style="{position: navfloat? 'fixed':'inherit', 'background-color': baseInfo.backgroundColor}"
      >
        <li
          v-for="(nav, index) in navlist"
          :key="index"
          :class="{on: listindex == index}"
          @click="toChange(index)"
          :style="{
            'line-height': $px2vw(baseInfo.height),
            'height': $px2vw(baseInfo.height),
            'font-size': listindex == index ? $px2vw(baseInfo.focusFontSize) : $px2vw(baseInfo.fontSize),
            'background-color': listindex == index ? baseInfo.focusBackgroundColor:'inherit',
            'color': listindex == index ? baseInfo.focusColor: baseInfo.color
          }"
        >{{nav.name}}</li>
      </ul>
    </div>
    <div class="slot-area">
      <slot :topicid="topicid"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "HsFloatNav",
  props: {
    navcount: {
      type: Number,
      default: 4
    },
    pattern: {
      type: String,
      default: "tab"
    },
    baseInfo: {
      type: Object,
      default: () => {
        return {
          height: "38",
          fontSize: "14",
          color: "#000",
          backgroundColor: "#fff",
          focusBackgroundColor: "#e2cfaa",
          focusFontSize: "14",
          focusColor: "#000"
        };
      }
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      navfloat: false,
      navtop: 0,
      listindex: 0,
      // {navcount: '', list: [{name: ''}, ]}
      keyOption: {
        baseInfo: {
          name: "基本信息",
          child: {
            height: { name: "高度", type: "pxinput", default: "38" },
            fontSize: { name: "字体大小", type: "pxinput", default: "14" },
            color: { name: "字体颜色", type: "color", default: "#000" },
            backgroundColor: { name: "背景色", type: "color", default: "#fff" },
            focusBackgroundColor: {
              name: "高亮背景色",
              type: "color",
              default: "#e2cfaa"
            },
            focusFontSize: {
              name: "高亮字体大小",
              type: "pxinput",
              default: "14"
            },
            focusColor: { name: "高亮字体颜色", type: "color", default: "#000" }
          }
        },
        navcount: { name: "数量", type: "radio", bind: ["list"] },
        pattern: { name: "模式", type: "radio", bind: ["tabtopicid"] },
        list: {
          name: "菜单项",
          accept: "navcount",
          child: [
            {
              key: "tab",
              name: "tab",
              child: {
                name: { name: "名称", default: "tab", type: "input" },
                tabtopicid: {
                  name: "专题号",
                  default: "",
                  type: "input",
                  accept: "pattern"
                }
              }
            },
            {
              key: "tab",
              name: "tab",
              child: {
                name: { name: "名称", default: "tab", type: "input" },
                tabtopicid: {
                  name: "专题号",
                  default: "",
                  type: "input",
                  accept: "pattern"
                }
              }
            },
            {
              key: "tab",
              name: "tab",
              child: {
                name: { name: "名称", default: "tab", type: "input" },
                tabtopicid: {
                  name: "专题号",
                  default: "",
                  type: "input",
                  accept: "pattern"
                }
              }
            },
            {
              key: "tab",
              name: "tab",
              child: {
                name: { name: "名称", default: "tab", type: "input" },
                tabtopicid: {
                  name: "专题号",
                  default: "",
                  type: "input",
                  accept: "pattern"
                }
              }
            }
          ]
        }
      }
    };
  },
  watch: {},
  mounted() {
    let me = this;
    window.addEventListener("scroll", function() {
      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      me.navtop = me.$refs[me.ref].offsetTop;
      console.log(me.navtop);
      me.navfloat = scrolltop > me.navtop ? true : false;
    });
  },
  computed: {
    ref() {
      return `floatnav${this.refId()}`;
    },
    navlist() {
      return this.list.slice(0, this.navcount);
    },
    topicid() {
      return this.list[this.listindex]
        ? this.list[this.listindex].tabtopicid
        : "";
    }
  },
  methods: {
    refId() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    toChange(i) {
      this.listindex = i;
      document.documentElement.scrollTop = this.navtop;
      document.body.scrollTop = this.navtop;
    }
  }
};
</script>

<style lang="less" scoped>
.floatnav {
  width: 100%;
  // height: 38px;
  background-color: #fff;
  .float {
    width: 100%;
    background-color: #fff;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    flex-direction: row;
    li {
      height: 100%;
      flex: 1;
      font-size: 14px;
      text-align: center;
      // &.on {
      //   background: linear-gradient(to right, #f4e7d0, #e2cfaa);
      // }
    }
  }
}
</style>
