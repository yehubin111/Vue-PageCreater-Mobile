<template>
  <div class="floatnav">
    <ul class="float" :style="{position: navfloat? 'fixed':'inherit'}">
      <li
        v-for="(nav, index) in navlist"
        :key="index"
        :class="{on: listindex == index}"
        @click="toChange(index)"
      >{{nav}}</li>
    </ul>
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
    list: {
      type: Array,
      default: () => ([])
    }
  },
  data() {
    return {
      navfloat: false,
      listindex: 0,
      // {navcount: '', list: [{name: ''}, ]}
      keyOption: {
        navcount: { name: "数量", type: "radio", bind: ["list"] },
        list: {
          name: "菜单项",
          accept: "navcount",
          child: [
            { key: "name", name: "名称", default: "", type: "input" },
            { key: "name", name: "名称", default: "", type: "input" },
            { key: "name", name: "名称", default: "", type: "input" },
            { key: "name", name: "名称", default: "", type: "input" }
            // {key: 'tab', name: 'tab', child: {
            //   name: { name: "名称", default: "", type: "input" }
            // }}
          ]
        }
      }
    };
  },
  watch: {

  },
  computed: {
    navlist() {
      return this.list.slice(0, this.navcount);
    }
  },
  methods: {
    toChange(i) {
      this.listindex = i;
    }
  }
};
</script>

<style lang="less" scoped>
.floatnav {
  width: 375px;
  height: 38px;
  background-color: #fff;
  .float {
    width: 375px;
    height: 38px;
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
      line-height: 38px;
      &.on {
        background: linear-gradient(to right, #f4e7d0, #e2cfaa);
      }
    }
  }
}
</style>
