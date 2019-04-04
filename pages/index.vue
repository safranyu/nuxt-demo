<template>
  <section class="container">
    <Carousel :imagesList="imagesList"></Carousel>
    <!-- 内容导航 -->
    <Contentbox></Contentbox>
  </section>
</template>

<script>
import axios from "axios";
import Carousel from '~/components/home/Carousel.vue'
import Contentbox from '~/components/home/Contentbox.vue'
export default {
  async asyncData(app) {
    let { data } = await app.$axios.get("/api/BwwdMoblie.php/Recognize/index.html")
    try {
      console.log('222',data)
    } catch (err) {
      console.log(err)
    }
    return {
      imagesList: data.data
    } 
  },
  components: {
    Carousel,
    Contentbox
  },
  data() {
    return {
      imagesList:''
    };
  },
};
</script>

<style lang="scss">
.container {
  ul {
    li {
      font-size: 6px;
    }
  }
  .van-swipe {
    margin-top: 14px;
    margin-left: 20px;
    margin-right: 20px;
    height: 450px;
    border-radius: 7px;
    box-shadow: 0 6Px 16Px rgba(0, 0, 0, 0.22);
    .van-swipe-item {
      .bannerImg {
        display: block;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-position: center;
      }
    }
    .van-swipe__indicators {
      bottom: 30px;
    }
    .van-swipe__indicator {
      width: 12px;
      height: 12px;
      background-color: #979aa3;
    }
  }
}

</style>


