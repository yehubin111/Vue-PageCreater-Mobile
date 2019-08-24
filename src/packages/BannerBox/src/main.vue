<template>
  <div class="image" :style="{'padding': $px2vw(padding)}">
    <div class="bannerbox">
      <img v-if="url" :src="url" alt />
      <div class="default" v-else>
        <p>
          <span>图片</span>
        </p>
      </div>
      <div class="slot-area row-flex ac" :style="{'justify-content': justifyContent}" ref="slotarea">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HsBannerBox",
  props: {
    url: {
      type: String,
      default: ""
    },
    padding: {
      type: String,
      default: "0 0 0"
    },
    position: {
      type: String,
      default: "center"
    }
  },
  data() {
    return {
      keyOption: {
        url: { name: "图片", type: "fileupload" },
        padding: { name: "边距（上 左右 下）", type: "padding" },
        position: { name: "子元素定位", type: "radio" }
      }
    };
  },
  computed: {
    justifyContent() {
      let position = "";
      switch (this.position) {
        case "center":
          position = "center";
          break;
        case "left":
          position = "flex-start";
          break;
        case "right":
          position = "flex-end";
          break;
      }
      return position;
    }
  },
  created() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.image {
  width: 100%;
  box-sizing: border-box;
  // background-color: #fff;
  .bannerbox {
    position: relative;
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
    img {
      width: 100%;
      display: block;
    }
    .slot-area {
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .slot-cont {
        padding: 0;
      }
    }
  }
}
</style>

