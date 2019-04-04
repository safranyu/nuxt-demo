<template>
  <div>
    <h2>new-content [{{ $route.params.id }}]</h2>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  validate ({params}){ //传递过来的参数进行校验 true进入，false进入404页面
    return /^\d+$/.test(params.id)
  },
  data() {
    return{
      title:this.$route.params.title
    }
  },
  head(){
    return{
      title: this.title,
      meta:[
        {hid:'description',name:'news',content:'ssssssss'}
      ]
    }
  }
}
</script>

<style lang='css'>
</style>