<template>
  <div class="page-nav clearfix">
      <div class="page-nav-up">
        <div class="page-nav-left">
          <nuxt-link :to="{name:'medialist-id',params:{id:1, title:'竞赛'}}" class="nav-box">
            <div>
              <img src="~/assets/images/js.png" alt class="nav-icon-js">
              <span>竞赛</span>
            </div>
          </nuxt-link>
          <nuxt-link :to="{name:'medialist-id',params:{id:2, title:'商学院'}}" class="nav-box">
            <div>
              <img src="~/assets/images/sxy.png" alt class="nav-icon-sxy">
              <span>商学院</span>
            </div>
          </nuxt-link>
          <nuxt-link :to="{name:'medialist-id',params:{id:3, title:'钻石大会'}}" class="nav-box">
            <div>
              <img src="~/assets/images/zs.png" alt class="nav-icon-zsdh">
              <span>钻石大会</span>
            </div>
          </nuxt-link>
          <nuxt-link :to="{name:'medialist-id',params:{id:4, title:'慈善会'}}" class="nav-box">
            <div>
              <img src="~/assets/images/chishan.png" alt class="nav-icon-csh">
              <span>慈善会</span>
            </div>
          </nuxt-link>
        </div>
        <div class="page-nav-right">
          <nuxt-link to>
            <div>
              <img src="~/assets/images/sc.png" alt>
              <span>百万商城</span>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div class="page-nav-down">
        <nuxt-link :to="{name:'medialist-id',params:{id:5, title:'超级玩家众筹'}}" class="nav-down-left">
          <div>
            <img src="~/assets/images/zhongchou.png" alt>
            <span class="ell">超级玩家众筹</span>
          </div>
        </nuxt-link>
        
        <nuxt-link to class="nav-down-right">
          <div>
            <img src="~/assets/images/fjsj.png" alt>
            <span class="ell">附近商家</span>
          </div>
        </nuxt-link>
      </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang='scss'>
.page-nav{
  margin-top: 32px;
  width: 100%;
  height: auto;
  display: block;
  padding-left: 18px;
  padding-right: 18px;

  .page-nav-up{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .page-nav-left{
    width: 484px;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    .nav-box {
      display: block;
      width: 239px;
      height: 195px;
      background: url("~assets/images/upbg.png") center center no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items:center;
      &:nth-child(1){
        margin-bottom: 5.9px;
        margin-right: 5.9px;
      }
      &:nth-child(2){
        margin-bottom: 5.9px;
      }
      &:nth-child(3){
        margin-right: 5.9px;
      }
      div{
        width: auto;
        height: auto;
        text-align: center;
        span {
          width: 100%;
          display: block;
          font-size: 20px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          color: #2f2f37;
        }
        img{
          width: 100%;
          height: 100%;
        }
        .nav-icon-js{
          width: 60px;
          height: 53px;
        }
        .nav-icon-sxy{
          width: 67px;
          height: 51px;
        }
        .nav-icon-zsdh{
          width: 51px;
          height: 42px;
        }
        .nav-icon-csh{
          width: 54px;
          height: 42px;
        }
      }
    }
  }
  .page-nav-right{
    width: 224px;
    height: 396px;
    //margin-left: .06rem;
    a{
      display: block;
      width: 100%;
      height: 100%;
      background: url("~assets/images/scbg.png") center center no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items:center;
      div{
        width: auto;
        height: auto;
        text-align: center;
      }
      img{
        width: 67px;
        height: 53px;
      }
      span {
        display: block;
        color: #2f2f37;
        font-size: 12px;
      }
    }
  }
  .page-nav-down{
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 186px;
    margin-top: 6px;
    a{
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      div{
        text-align: center;
        img{
          width: 65px;
          height: 51px;
        }
        span {
          display: block;
          color: #2f2f37;
          font-size: 12px;
        }
      }
    }
    .nav-down-left{
      width: 484px;
      margin-left: 2px;
      background: url("~assets/images/zcbg.png") center center no-repeat;
      background-size: 100% 100%;
      margin-right: 2px;
    }
    .nav-down-right{
      margin-left: 6px;
      width: 224px;
      background: url("~assets/images/fjsjbg.png") center center no-repeat;
      background-size: 100% 100%;
    }
  }

}
</style>