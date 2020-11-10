<!--Author: CreateSun -->
<!--Date: 2020/10/4 -->

<template>
  <a-row type="flex" justify="center">
    <a-col :xs="22" :sm="20" :md="18" :lg="16" :xl="14">
      <Navigator></Navigator>
      <hr>
      <Nuxt/>
      <Footer></Footer>
    </a-col>
  </a-row>
</template>

<script>
    export default {
        name: "noWord",
    }
</script>

<style scoped>

</style>
