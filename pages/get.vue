<template>
  <div>
    <h1>{{info.name}}</h1>
    <h1>{{info.age}}</h1>
    <h1>{{info.interest}}</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      name: 'hello word'
    }
  },
  // asyncData(){
  //   return axios.get('https://api.myjson.com/bins/1f4eoe')
  //   .then((res)=>{
  //     console.log(res)
  //     return {info:res.data}
  //   })
  // },
  async asyncData() {
    let {data} = await axios.get('https://api.myjson.com/bins/1f4eoe')
    return {info: data}
  },
}
</script>

<style lang='css'>
</style>