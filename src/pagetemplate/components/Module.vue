<template>
  <div class="module">
    <component :is="name" v-bind="props"></component>
  </div>
</template>

<script>
  export default {
      props: {
          name: {
              type: String,
              required: true
          },
          props: {
              type: Object
          }
      }
  };
</script>

<style lang="less" scoped>
.module {
    // position: relative;
}
</style>
