<!--
* @description  基础布局
* @fileName  baseLayout
* @author 云霄
* @date 2023-07-06 16:53:15
!-->

<template>
  <div class="flex flex-col bg-image h-full w-full bg-[#333333]">
    <Header />
    <div class="w-full">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/index.vue'
</script>

<style lang="less" scoped>
.bg-image {
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
