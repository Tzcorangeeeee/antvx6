<script>

</script>

<template>
  <div class="nav">
    <div class="search"><img src="../assets/image/logo.png" alt="" style="width: 50px;height: 50px;">TzcProject</div>
    <div class="router">
      <router-link to="/home" class="router-item">Home</router-link>
      <router-link to="/graph" class="router-item">Antv-x6</router-link>
      <div class="router-item">XXX</div>
      <div class="router-item">XXX</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.nav{
  width: 80%;
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  .search{
    width: 20%;
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 30px;
  }
  .router{
    width: 45%;
    height: 40px;
    line-height: 30px;
    font-size: 24px;
    display: flex;
    justify-content: space-around;
    a {
      text-decoration: none;
      color: #000000;
    }
    .router-link-active {
      text-decoration: none;
    }
    .router-item:hover{
      border-bottom: 2px solid black;
    }
  }
}
</style>
