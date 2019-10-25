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
    <div class="slot-area" ref="slotarea">
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
      default: () => {
        return [
          {
            name: "tab",
            tabtopicid: ""
          },
          {
            name: "tab",
            tabtopicid: ""
          },
          {
            name: "tab",
            tabtopicid: ""
          },
          {
            name: "tab",
            tabtopicid: ""
          }
        ];
      }
    }
  },
  data() {
    return {
      navfloat: false,
      navtop: 0,
      listindex: 0,
      scrolltag: [],
      scrollarr: [],
      // {navcount: '', list: [{name: ''}, ]}
      keyOption: {
        navcount: { name: "数量", type: "number", bind: ["list"] },
        pattern: { name: "模式", type: "radio", bind: ["tabtopicid"] },
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
    this.$refs.slotarea.children[0].childNodes.forEach(v => {
      if (v.getAttribute("tag") == "placeholder") {
        this.scrolltag.push(v);
      }
    });
    this.scrolltag = this.scrolltag.slice(0, this.list.length);
    setTimeout(() => {
      this.initScrolltop();
    }, 1000)

    let me = this;
    window.addEventListener("scroll", function() {
      // 初始化各个placeholder位置
      me.initScrolltop();

      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      me.navtop = me.$refs[me.ref].offsetTop;
      me.navfloat = scrolltop > me.navtop ? true : false;

      if (me.pattern == "roll") {
        let n = me.listindex;
        me.scrollarr.forEach((v, i) => {
          if (scrolltop >= v) {
            n = i;
          }
        });
        if (
          document.documentElement.scrollHeight ==
            scrolltop + document.documentElement.clientHeight &&
          me.scrollarr.length == me.list.length
        ) {
          n = me.list.length - 1;
        }
        me.listindex = n;
      }
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
      return this.pattern == 'tab' && this.list[this.listindex]
        ? this.list[this.listindex].tabtopicid
        : "";
    }
  },
  methods: {
    initScrolltop() {
      this.scrollarr = this.scrolltag.map(
        v => v.offsetTop - this.baseInfo.height
      );
    },
    refId() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    toChange(i) {
      this.listindex = i;
      let scroll = 0;
      if (this.pattern == "tab") {
        scroll = this.navtop;
      } else if (!this.scrollarr[i]) {
        scroll = 0;
      } else {
        scroll = this.scrollarr[i];
      }
      document.documentElement.scrollTop = scroll;
      document.body.scrollTop = scroll;
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
    // width: 100%;
    background-color: #fff;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    flex-direction: row;
    overflow-x: auto;
    height: 100%;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      height: 100%;
      flex: 0 0 22%;
      flex-grow: 1;
      font-size: 14px;
      text-align: center;
      // &.on {
      //   background: linear-gradient(to right, #f4e7d0, #e2cfaa);
      // }
    }
  }
}
</style>
