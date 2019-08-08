<template>
  <div class="content">
    <template v-for="(cg, index) in componentsConfigs">
      <component :is="cg.moduleName" v-bind="cg.props" :sloter="sloter" :key="index">
        <template slot-scope="sloter">
          <module v-if="cg.component" :componentsConfigs="cg.component" :sloter="sloter"></module>
        </template>
      </component>
    </template>
  </div>
</template>

<script>
export default {
  name: "Module",
  props: {
    componentsConfigs: {
      type: Array
    },
    sloter: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped>
</style>
