<template>
  <div>
    <h2 v-if="error.statusCode == 404">404页面不存在</h2>
    <h2 v-else>500服务器错误{{error.statusCode}}</h2>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  props:['error'],
}
</script>

<style lang='css'>
</style>