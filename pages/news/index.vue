<template>
  <div>
    <h2>About news</h2>
    <p>newsID: {{$route.params.newsId}}</p>
    <ul>
      <li><nuxt-link to="/">home</nuxt-link></li>
      <li><nuxt-link :to="{name:'news-id',params:{id:123,title:'js1'}}">news-1</nuxt-link></li>
      <li><nuxt-link :to="{name:'news-id',params:{id:234,title:'js2'}}">news-2</nuxt-link></li>
      <li><nuxt-link :to="{name:'news-id',params:{id:'dd'}}">news-dd</nuxt-link></li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang='css'>
</style>