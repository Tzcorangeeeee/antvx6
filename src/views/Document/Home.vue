<script setup>
import { useRouter } from 'vue-router'
import { onBeforeUnmount, ref } from 'vue'

const router = useRouter()
const fullscreenLoading = ref(false)

function gotoUse() {
  fullscreenLoading.value = true
  let timer = null

  timer = setTimeout(() => {
    fullscreenLoading.value = false
    router.push('/graph')
  },500)
  onBeforeUnmount(() => {
    clearTimeout(timer)
  })
}
</script>
<template>
  <div class="home">
    <div class="titleBox">
      <span class="title">基于AntV-x6包封装使用</span>
      <span class="content">这是一个基于x6包封装的简易流程图使用项目<br>封装了基础图像,可以通过工具栏或者快捷键进行增删改查<br>方便用户进行增删改查</span>
      <el-button v-loading.fullscreen.lock="fullscreenLoading" type="primary" @click="gotoUse">点击使用</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100wh;
  height: 100vh;
  background-image: url('../../assets/image/HomeBackground.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  .titleBox{
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 10px;
    background-color: rgba(10, 10, 10, 0.1);
    width: 700px;
    height: 400px;
    position: relative;
    top:150px;
    left: 50px;
    .title{
      margin-top: 10px;
      margin-left: 20px;
      color: white;
      font-size: 50px;
      font-weight: bold;
      display: flex;
    }
    .content{
      margin-left: 20px;
      margin-top: 40px;
      font-size: 24px;
    }
    ::v-deep .el-button{
      width: 200px;
      height: 60px;
      margin-left: 20px;
      margin-top: 40px;
      font-size: 24px;
    }
  }
}
</style>
