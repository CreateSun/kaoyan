<!--Author: CreateSun -->
<!--Date: 2020/7/21 -->

<template>
  <div>
    <a-col style="margin: 1rem 0 1rem 0">
      <nuxt-link to="/">
        首页
      </nuxt-link>
      <nuxt-link to="information">
        考研信息
      </nuxt-link>
      <nuxt-link to="notes">
        学习笔记
      </nuxt-link>
      <nuxt-link to="journal">
        打卡日志
      </nuxt-link>

    </a-col>
  </div>
</template>

<script>
    export default {
        name: "Navigator"
    }
</script>

<style scoped>

</style>
