<script setup>
import { ref,onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const account = ref('')
const password = ref('')
const fullscreenLoading = ref(false)

function handleLogin() {
  fullscreenLoading.value = true
  let timer = null

  if (account.value && password.value === 'tzc') {
    timer = setTimeout(() => {
      fullscreenLoading.value = false
      router.push('/home')
    },500)
  } else {
    fullscreenLoading.value = false
    alert('请输入正确的账号密码')
  }
  onBeforeUnmount(() => {
    clearTimeout(timer)
  })
}
const ifShowQR = ref(false)

const showQR = () => {
  ifShowQR.value = !ifShowQR.value
  // 当展开时增加最小高度
  if (ifShowQR.value) {
    document.querySelector('.loginBox').style.minHeight = '450px'
  } else {
    document.querySelector('.loginBox').style.minHeight = '380px'
  }
}
</script>

<template>
  <div class="box">
    <div class="loginBox" @keydown.enter="handleLogin">
      <div class="title">欢迎登入</div>
      <div class="inputBox">
        <div class="AAP">
          账号：
          <el-input
            v-model="account"
            placeholder="请输入账号"
            class="login-input"
          />
        </div>
        <div class="AAP">
          密码：
          <el-input
            v-model="password"
            class="login-input"
            placeholder="请输入密码"
          />
        </div>
      </div>
      <div class="passwordBox">
        <a href="">忘记密码</a>
        <a href="">修改密码</a>
      </div>
      <div style="display: flex; align-items: center;">
        <el-button v-loading.fullscreen.lock="fullscreenLoading" class="logIn" type="primary" @click="handleLogin">
          登 入
        </el-button>
        <div class="QR">
          <img src="../../assets/image/二维码.png" alt="" title="二维码模式" @click="showQR">
        </div>
      </div>
      <transition name="slide-fade">
        <div v-if="ifShowQR" class="showQR">
          请扫码右侧<br>二维码登入
          <img src="../../assets/image/QR_code.png" alt="">
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box{
  width: 100%;
  height: 100vh;
  background-image: url("../../assets/image/loginBackgroun.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  .loginBox{
    width: 300px;
    min-height: 380px;
    transition: all 0.3s ease;
    border: 2px solid black;
    margin: 0 auto;
    position: relative;
    top: 150px;
    border-radius: 10px;
    background-color: rgba(10, 10, 10, 0.1);
    .title{
      margin-left: 25%;
      margin-top: 10%;
      font-size: 42px;
      font-weight: bold;
      color: white;
    }
    .inputBox{
      width: 100%;
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      margin-top: 10%;
      .AAP{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
        color: white;
      }
      .login-input{
        margin-bottom: 20px;
        width: 80%;
      }
    }
    .logIn{
      width: 195px;
      height: 40px;
      margin-left: 10%;
      margin-top: 15%;
      font-size: 14px;
      font-weight: bold;
      color: white;
      &:hover{
        background-color: rgba(10, 10, 10, 0.1);
      }
    }
    .passwordBox{
      width: 80%;
      display: flex;
      justify-content: space-between;
      margin-left: 10%;
      margin-top: 20px;
      a{
        text-decoration: none;
        color: white;
      }
    }
    .QR img{
      width: 35px;
      height: 35px;
      margin-top: 50px;
      margin-left: 13px;
      &:hover{
        background-color: white;
        border-radius: 3px;
        cursor: pointer;
      }
    }
    .showQR {
      position: absolute;
      bottom: -40px;
      right: 0;
      border-radius: 8px;
      margin-bottom: 50px;
      margin-right: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 30px;
      color: white;
      img {
        width: 80px;
        height: 80px;
        margin-left: 10px;
      }
    }
  }
}
</style>
