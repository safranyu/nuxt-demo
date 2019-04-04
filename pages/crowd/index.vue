<template>
  <van-tabs v-model="active" @click="onClick" sticky>
    <van-tab v-for="(val,index) in tabTitle" :key="index">
      <div slot="title" class="van-crowd">
        <div :class="val.kind">
          <img :src="active == index ? val.img : val.imgNo" alt>
        </div>
        <span>{{ val.title }}</span>
      </div>
      <nuxt-link
        class="crowd-card"
        v-for="item in (active == 1 ? underway : active == 2 ?  finish : preheat)"
        :key="item.id"
        :to="{name:'goods-id',params:{id:item.id, title:item.title}}"
        tag="div">
        <div class="main-content-up">
          <div class="up-img">
            <img v-bind:src="url+item.images" alt>
            <i class="inimg">
              <img v-if="active == 0" src="~/assets/images/yrimg.png" alt>
              <img v-else-if="active == 1" src="~/assets/images/inimg.png" alt>
              <img v-else-if="active == 2" src="~/assets/images/jsimg.png" alt>
            </i>
          </div>
          <div class="up-title">
            <span>{{item.title}}</span>
            <small>每个ID限购{{item.limit_periods}}份</small>
          </div>
          <div class="up-time">{{item.start_time | getStartTime}}</div>
        </div>
        <div class="main-content-down">
          <div class="down-msg">
            <div class="down-msg-money">
              <span>众筹规模</span>
              <span>{{item.total}}万</span>
            </div>
            <div class="down-msg-time">
              <span>{{ active == 0 ? '距离开始': '剩余时间'}}</span>
              <span class="time">
                <count-down :start-time="item.start_time" :end-time="item.end_time"></count-down>
              </span>
            </div>
          </div>
          <div class="down-buy">
            <div class="down-buy-plan">
              <van-progress
                :percentage="item.schedule | getPercent"
                :pivot-text="`${item.schedule}`"
                pivot-color="#7232dd"
                color="linear-gradient(to right, #E8C500, #D8B800)"
              />
            </div>
            <div
              class="down-buy-btn"
              :class="active == 1 ? '':'notStarted'"
              @click.stop="getPopup(item.goods_id,item.periods)"
            >{{ active == 0 ? '未开始': active == 1 ? '立即购买': '已结束'}}</div>
          </div>
        </div>
      </nuxt-link>
    </van-tab>
    {{goodsList}}
  </van-tabs>
</template>

<script>
import axios from "axios";
import CountDown from "~/components/CountDown.vue";
export default {
  components: {
    CountDown
  },
  data() {
    return {
      active: 1,
      index: true,
      isShow: false,
      url: "http://bwwd.cs",
      tabTitle: [
        {
          path: "/mycrowd/preheat",
          title: "预热中",
          imgNo: require("~/assets/images/preheatNO.png"),
          img: require("~/assets/images/preheat.png"),
          kind: "preheat"
        },
        {
          path: "/mycrowd/crowd",
          title: "进行中",
          imgNo: require("~/assets/images/haveinsNO.png"),
          img: require("~/assets/images/haveins.png"),
          kind: "havein"
        },
        {
          path: "/mycrowd/over",
          title: "已结束",
          imgNo: require("~/assets/images/overNO.png"),
          img: require("~/assets/images/over.png"),
          kind: "over"
        }
      ],
      goodsList:null,
    };
  },
  filters: {
    // 过滤时间戳
    getStartTime: function(value) {
      let date = new Date(parseInt(value) * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d;
    },
    getPercent(val){
      return parseInt(val.slice(0, val.length - 1))
    } 
  },
  methods: {
    onClick(index) {
      // this.asyncData(index,this.type)
      console.log("111=", index);
    },
    getPopup(id, periods) {
      console.log('222=',id,periods)
      app.$axios.post('/api/BwwdMoblie.php/Recognize/getGoodsInfo.html',{goods_id:id,periods:periods})
      .then((response)=> {
        console.log('333=',response)
        this.isShow = true
        this.goodsList = response.data.data
      })
      .catch(function(error){
        console.log(error)
      })
    }
  },
  watch: {
    $route: function() {
      //路由变化会触发
      console.log("触发了路由");
    }
  },
  
  async asyncData({ app, params }) {
    const page = 1;
    
    let [underway, preheat, finish] = await Promise.all([
      app.$axios.get(
        `/api/BwwdMoblie.php/Recognize/crowdFunding.html?type=2&page=${page}`
      ),
      app.$axios.get(
        `/api/BwwdMoblie.php/Recognize/crowdFunding.html?type=1&page=${page}`
      ),
      app.$axios.get(
        `/api/BwwdMoblie.php/Recognize/crowdFunding.html?type=3&page=${page}`
      )
    ]);
    return {
      underway: underway.data.data,
      preheat: preheat.data.data,
      finish: finish.data.data
    };
    console.log("333=", [underway, preheat, finish]);
    
  },
  
};
</script>

<style lang="scss">
.van-tabs--line {
  padding-top: 146px;
  .van-tabs__line {
    display: none;
  }
  .van-tabs__wrap {
    height: 120px;
    .van-tabs__nav {
      background-color: #eceefa;
    }
  }
  .van-tab:nth-child(3) {
    .van-crowd {
      border-left: 1px solid #bfc1ca;
      border-right: 1px solid #bfc1ca;
    }
  }
  img {
    width: 100%;
  }
}
.preheat {
  width: 43px;
  height: 49px;
  margin: 20px auto 0 auto;
}
.havein {
  width: 45px;
  height: 57px;
  margin: 12px auto 0 auto;
}
.over {
  width: 43px;
  height: 43px;
  margin: 20px auto 4px auto;
}
.crowd-card {
  margin-bottom: 13px;
  background-color: #eceefa;
  padding: 13px 15px;
  height: 334px;
  .main-content-up {
    border-bottom: 1px solid #acaeb6;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 10px;
    .up-img {
      width: 158px;
      height: 158px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .inimg {
        width: 70px;
        height: 70px;
        position: absolute;
        top: -1px;
        left: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .up-title {
      font-size: 24px;
      padding-left: 15px;
      flex: 1;
      overflow: hidden;
      span {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #1d1d1d;
      }
      small {
        color: #3b3a3a;
      }
    }
    .up-time {
      margin-left: 52px;
      color: #cbac00;
      font-size: 20px;
      padding-top: 38px;
    }
  }
  .main-content-down {
    .down-msg {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      padding-bottom: 20px;
      .down-msg-money {
        padding-left: 4px;
        span:first-child {
          color: #555555;
          font-size: 20px;
          display: block;
        }
        span:last-child {
          display: block;
          font-size: 22px;
        }
      }
      .down-msg-time {
        text-align: right;
        font-size: 20px;
        span {
          display: block;
          color: #69696b;
        }
        .tiem {
          color: #cbac00;
        }
      }
    }
    .down-buy {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .down-buy-plan {
        width: 430px;
        height: 28px;
        background-color: #c4c4c4;
        border-radius: 14px;
        position: relative;
        .van-progress {
          height: 28px;
          border-radius: 14px;
          position: relative;
          .van-progress__portion {
            border-radius: 14px;
            .van-progress__pivot {
              position: absolute;
              // height: 12px;
              width: auto;
              left: 50%;
              right: 50%;
              transform: translate(-50%, -50%);
              color: white;
              background: rgba(0, 0, 0, 0) !important;
            }
          }
        }
      }
      .down-buy-btn {
        display: block;
        line-height: 35px;
        color: #cbac00;
        padding: 0 12px;
        border: 2px solid #cbac00;
        border-radius: 8px;
        text-align: center;
        font-size: 20px;
        &.notStarted {
          border: 2px solid #c4c4c4;
          color: #c4c4c4;
        }
      }
    }
  }
}
</style>
