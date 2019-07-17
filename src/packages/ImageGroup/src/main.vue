<template>
  <div class="imagelist" :style="{'grid-template-columns': columns, 'grid-gap': gap, 'padding-left': bothPadding, 'padding-right': bothPadding,'margin-top': marginTop }">
    <div class="image" v-for="(img, index) in imageList" :key="index" @click="clickCallback(index)">
      <img v-if="img" :src="img" alt />
      <div class="default" v-else>
        <p :style="{'font-size': count > 3 ? '12px' : '14px'}">
          <span>图片</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HsImageGroup",
  props: {
    count: {
      type: Number,
      required: true
    },
    list: {
      type: Object,
      required: true
    },
    gap: {
      type: String
    },
    bothPadding: {
      type: String
    },
    marginTop: {
      type: String
    }
  },
  data() {
    return {
    }
  },
  computed: {
    imageList() {
      return Object.values(this.list).slice(0, this.count);
    },
    columns() {
      let arr = [];
      while(arr.length < this.count) {
        arr.push('1fr');
      }
      return arr.join(' ');
    }
  },
  methods: {
    clickCallback(i) {
      this.$emit("click", i);
    }
  }
};
</script>

<style lang="less" scoped>
.imagelist {
  display: grid;
  // flex-direction: row;
  grid-template-rows: 1fr;
  // justify-content: space-between;
  .image {
    width: 100%;
    background-color: #fff;
    .default {
      box-sizing: border-box;
      padding: 10px;
      p {
        height: 0;
        padding-top: 75%;
        background-color: #fafafa;
        border: 1px dotted #ddd;
        box-sizing: border-box;
        position: relative;
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
}
</style>

