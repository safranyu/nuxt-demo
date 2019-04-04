<template>
  <van-swipe :autoplay="3000" indicator-color="#e8c716">
      <van-swipe-item v-for="imgs in imagesList" :key="imgs.id">
        <a
          :href="imgs.link"
          class="bannerImg"
          v-bind:style="{ backgroundImage: 'url('+url+imgs.images+')'}"
        ></a>
      </van-swipe-item>
    </van-swipe>
</template>

<script>

export default {
  data () {
    return {
      url: "http://bwwd.cs"
    }
  },
  props:['imagesList'],
  mounted(){
    console.log('img')
  }
}
</script>

<style lang='css'>
</style>