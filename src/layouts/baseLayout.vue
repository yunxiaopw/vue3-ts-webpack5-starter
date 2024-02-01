<!--
* @description  基础布局
* @fileName  baseLayout
* @author 云霄
* @date 2023-07-06 16:53:15
!-->

<template>
  <div class="flex flex-col bg-image w-full bg-[#333333] relative">
    <div class="absolute h-[700px] w-full">
      <div class="shadow-box"></div>
    </div>
    <Header />
    <div class="w-full z-10">
      <router-view />
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import Footer from '@/components/Footer/index.vue'
import Header from '@/components/Header/index.vue'
</script>

<style lang="less" scoped>
.bg-image {
  background-repeat: no-repeat;
  background-size: contain;
}
.shadow-box {
  position: absolute;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: linear-gradient(to top, #333 0, transparent);
}
</style>
