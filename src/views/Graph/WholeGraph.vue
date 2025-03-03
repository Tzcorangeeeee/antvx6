<script setup>
import { ref,provide } from 'vue'
import Graph from './Graph.vue'
import Tools from './Tools.vue'
import Drawer from './Drawer.vue'

const graphInstance = ref(null)

provide('graphInstance',graphInstance)

const handleGraphMount = (instance) => {
  // 安全设置值
  if (instance) {
    graphInstance.value = instance
  }
}
</script>

<template>
  <div class="Box">
    <Tools class="Tools" />
    <Graph class="Graph" @graph-mounted="handleGraphMount" />
    <Drawer />
  </div>
</template>

<style scoped lang="scss">
.Box{
  width: 100%;
  height: 100vh;
  border: none;
  margin: 0 auto;
  overflow: hidden;
  position: relative;
  .Tools{
    position: absolute;
    top: 10px;
    right: -300px;
    z-index: 1;
  }
}

</style>
