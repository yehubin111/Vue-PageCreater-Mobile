<template>
  <div class="image" :style="{'padding': padding}">
    <img v-if="url" :src="url" alt />
    <div class="default" v-else>
      <p>
        <span>图片</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HsBanner",
  props: {
    url: {
      type: String,
      default: ""
    },
    padding: {
      type: String,
      default: "0px 0px 0px"
    }
  },
  data() {
    return {
      keyOption: {
        url: { name: "图片", type: "fileupload" },
        padding: { name: '边距（上 左右 下）', type: 'padding' },
      }
    };
  },
  computed: {},
  created() {
     
  },
  methods: {
    
  }
};
</script>

<style lang="less" scoped>
.image {
  width: 100%;
  box-sizing: border-box;
  // background-color: #fff;
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
  img {
    width: 100%;
    display: block;
  }
}
</style>

