<template>
  <div class="box">
    <div id="stencilContainer" ref="stencilContainer" />
    <div id="container" ref="container" />
  </div>
</template>

<script setup>
import { onMounted, ref, defineEmits } from 'vue'
import {
  getGraphConfig,
  initStencil,
  getNodeDefinitions,
  registerPlugins,
  initNodeEvents
} from '@/utils/config'

const graph = ref(null)
const stencil = ref(null)
const container = ref(null)
const stencilContainer = ref(null)
const emit = defineEmits(['graph-mounted'])

onMounted(() => {
  // 初始化图实例
  graph.value = getGraphConfig(container.value)

  // 初始化Stencil
  stencil.value = initStencil(graph.value, stencilContainer.value)

  // 创建并加载节点
  const nodes = getNodeDefinitions(graph.value)

  stencil.value.load(nodes, 'group1')

  // 注册插件
  registerPlugins(graph.value)

  // 初始化节点事件
  initNodeEvents(graph.value)

  emit('graph-mounted', graph.value)
})
</script>

<style scoped lang="scss">
.box {
  display: flex;
  height: calc(100vh - 64px);
  .graph-container {
    position: relative;
  }
  #container {
    height: 100vh;
    flex-grow: 1; // 让主画布占用剩余空间
    height: 100vh;
    margin: 0;
    border: 1px solid #faefef;
    border-radius: 10px;
  }
  #stencilContainer {
    width: 320px;
    height: 99.5%;
    overflow-y: auto;
  }
  :deep(.x6-widget-stencil) {
    // 整体容器优化
    background: #f8fafd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .x6-widget-stencil-search {
      width: 294px !important;
      padding: 12px;
      background: linear-gradient(145deg, #f4f7fc, #e8f0fe);
      border: 1px solid #c3d4ff;
      border-radius: 6px;
      transition: all 0.3s ease;

      &:hover {
        border-color: #5b8cff;
        box-shadow: 0 2px 8px rgba(91, 140, 255, 0.15);
      }

      input {
        font-size: 14px;
        color: #2d3748;
        padding: 8px 12px;
        border-radius: 4px;
        border: 1px solid #e2e8f0;
        transition: all 0.2s ease;

        &:focus {
          outline: none;
          border-color: #5b8cff;
          background: linear-gradient(145deg, #f0f6ff, #ffffff);
          box-shadow: 0 0 0 3px rgba(91, 140, 255, 0.2);
        }

        &::placeholder {
          color: #a0aec0;
        }
      }
    }

    .x6-graph-svg {
      width: 346px !important;
      height: calc(100vh - 80px);
      background: #ffffff;
      border-radius: 6px;
      margin-top: 12px;
    }

    .x6-widget-stencil-content {
      width: 320px !important;
      height: 640px !important;
      border: 2px solid #e2e8f0;
      border-radius: 0 0 8px 8px;
      background: #ffffff;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03);
      padding: 8px;
    }

    .x6-widget-stencil-group-title {
      color: #216cef;
      font-weight: 600;
      font-size: 15px;
      background: #f8fafd;
      margin-top: 15px;
      margin-left: 15px;
      border-radius: 4px;
    }
  }
}
</style>
