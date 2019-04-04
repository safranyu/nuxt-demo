<template>
  <van-tabbar v-model="active" active-color="#ae9403">
    <van-tabbar-item to="/">
      <span>首页</span>
      <i slot="icon" class="iconfont icon-zhuye"></i>
    </van-tabbar-item>
    <van-tabbar-item to="/crowd">
      <span>众筹</span>
      <i slot="icon" class="iconfont icon-fenlei"></i>
    </van-tabbar-item>
    <van-tabbar-item to="/my">
      <span>我的</span>
      <i slot="icon" class="iconfont icon-wode"></i>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data() {
    return {
      active: 0
      // icon: {
      //   normal: "//img.yzcdn.cn/icon-normal.png",
      //   active: "//img.yzcdn.cn/icon-active.png"
      // }
    };
  }
};
</script>

<style lang="scss">
.van-tabbar {
  height: 1.2rem !important;
  box-shadow: 0 1px 16px rgba(0, 0, 0, 0.2);
  background-color: #e6e8f5 !important;
  .van-tabbar-item {
    font-size: 20px;
    .iconfont {
      font-size: 35px;
    }
  }
}
</style>
