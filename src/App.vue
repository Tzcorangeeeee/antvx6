<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <router-view />
</template>

<style lang="scss">
.container {
  width: 100px;
  height: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 24px;
}
</style>
