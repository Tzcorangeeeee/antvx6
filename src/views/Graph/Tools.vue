<template>
  <div class="box">
    <div class="item">
      <el-tooltip v-for="item in toolsList" :key="item.id" :content="item.name">
        <component :is="`el-icon-${item.icon}`" class="item-icon" @click="handleItem(item)" />
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { inject,onMounted,onUnmounted } from 'vue'
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import { handleKeyDown } from '@/utils/KeyboardHandler'

const graph = inject('graphInstance')

function handleItem(item) {
  if (!graph?.value) {
    console.error('图表未初始化')

    return
  }

  switch (item.action) {
    case 'plus':
      plus()
      break
    case 'minus':
      minus()
      break
    case 'download':
      download()
      break
    case 'back':
      Undo()
      break
    case 'forward':
      Redo()
      break
    case 'middle':
      middle()
      break
    case 'fullscreen':
      Goscreenfull()
      break
    default:
      break
  }
}
const toolsList = [
  {
    id: 1,
    name: '后退',
    icon: 'back',
    action: 'back'
  },
  {
    id: 2,
    name: '前进',
    icon: 'right',
    action: 'forward'
  },
  {
    id: 3,
    name: '缩小',
    icon: 'minus',
    action: 'minus'
  },
  {
    id: 4,
    name: '放大',
    icon: 'plus',
    action: 'plus'
  },
  {
    id: 5,
    name: '居中',
    icon: 'location',
    action: 'middle'
  },
  {
    id: 6,
    name: '全屏',
    icon: 'fullscreen',
    action: 'fullscreen'
  },
  {
    id: 7,
    name: '导出',
    icon: 'download',
    action: 'download'
  }
]
const plus = () => {
  graph.value.zoom(0.8)
  console.log(graph.value)
}
const minus = () => {
  graph.value.zoom(-0.5)
}
const Undo = () => {
  graph.value.undo()
  console.log(graph.value)
}
const Redo = () => { // 可选：前进功能
  graph.value.cleanSelection()
  graph.value.redo({
    ignoreAdd: true,
    ignoreRemove: true
  })
}
const middle = () => {
  graph.value.centerContent({ padding: { right: 300 } })
}
const download = () => {
  graph.value.exportPNG('chart', {
    width: 2048,
    height: 2048,
    padding: 50,
    backgroundColor: '#FFFFFF',
    quality: 1
  })
}
const Goscreenfull = () => {
  const container = document.querySelector('#container')

  screenfull.toggle(container)
  console.log('111')
}

onMounted(() => {
  document.addEventListener('keydown', (e) => handleKeyDown(e, graph, ElMessage))
})



</script>

<style lang="scss" scoped>
.box{
  width: 80%;
  margin: 0 auto;
  .item {
    width: 500px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 15px;
    background: #fff;
    .item-icon {
      width: 20px;
      height: 20px;
      &:hover {
        box-shadow: 1px 1px 1px 1px #888888;
      }
    }
  }
}

</style>
