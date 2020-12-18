<!--
 * @Author: wangtengteng
 * @Date: 2020-11-16 09:29:54
 * @LastEditTime: 2020-12-18 20:08:15
 * @FillPath: Do not edit
-->
<template>
  <div class="home">
    <div class="home-body">
      <div class="home-banner" @mousemove="onMouseover($event)">
        <div ref="banner2" class="banner2">
          <img src="../../assets/image/banner2.png" alt="">
        </div>
        <div ref="banner1" class="banner1">
          <img src="../../assets/image/banner1.png" alt="">
        </div>
        <div ref="banner3" class="banner3">
          <img src="../../assets/image/banner3.png" alt="">
        </div>
      </div>
      <div class="home-content">
        <div class="guigu">
          <p>1988，<span>始于硅谷</span></p>
          <img src="../../assets/image/1988.png" alt="">
        </div>
        <div class="china">
          <p>2005，<span>进入中国</span></p>
        </div>
        <div class="money">
          <p>100亿</p>
          <span>+长周期资本，人民币/美元双币，持续创造远高于平均水平的投资回报。<br /><br />120＋优秀创业公司，赶集、趣店、蘑菇街、理想汽车、青云、水滴、百科名医、柏睿数据、宜买车、高仙机器人、怪兽充电、乐乐课堂、唱吧、伊对的早期机构投资者。</span>
          <div>
            <div class="longLine"></div>
            <div class="shortLine"></div>
          </div>
        </div>
        <div class="aboutus">
          <img src="../../assets/image/aboutus.png" alt="">
          <p>关于xx</p>
        </div>
      </div>
    </div>
    <div class="home-footer">

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onMouseover (event) {
      let e = event || window.event;
      let left = e.clientX;
      let top = e.clientY;
      // console.log(left, top)

      this.$refs['banner1'].style.left = -(left / 15) + 'px';
      this.$refs['banner1'].style.top = -(top / 15) + 'px';
      this.$refs['banner2'].style.left = -(left / 40) + 'px';
      this.$refs['banner2'].style.top = -(top / 40) + 'px';
      this.$refs['banner3'].style.left = -(left / 40) + 'px';
      this.$refs['banner3'].style.top = -(top / 40) + 'px';
    },
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "Montserrat";
  src: url("../../assets/iconfont/SourceHanSerifCN-Medium.otf");
}

.home {
  background: #000;
  color: #fff;
  min-width: 1200px;
  // height: calc(100%-70px);

  .home-body {
    position: relative;
    display: flex;
    width: 100%;
    padding-top: 10px;
    // height: 100%;
    height: calc(100vh - 70px);
    background: #000;
    // max-width: 1500px;
    margin: 0 auto;
    font-family: "Montserrat";

    .home-banner {
      flex: 1;
      width: 100%;
      position: relative;
      margin-left: 100px;
      margin-top: 70px;
      overflow: hidden;

      img {
        width: 70%;
      }

      .banner1 {
        position: absolute;
        top: 0;
        left: 0;
        width: 95%;
      }

      .banner2 {
        display: inline-block;
        position: absolute;
        margin-top: -46px;
        top: 0;
        left: 0;
        img {
          width: 80%;
        }
      }

      .banner3 {
        position: absolute;
        top: 0;
        left: 0;
        width: 85%;
      }
    }

    .home-content {
      width: 300px;
      min-height: 130px;
      margin-right: 50px;
      margin-top: 89px;
      position: absolute;
      top: 90px;
      right: 10%;

      .guigu {
        position: relative;
        z-index: 0;

        img {
          width: 39px;
          position: absolute;
          top: -5px;
          left: 37px;
          z-index: -1;
        }

        p {
          font-size: 30px;
          position: relative;
          z-index: 9;
        }

        span {
          font-size: 30px;
        }
      }

      .china {
        margin-top: 20px;

        p {
          font-size: 30px;
        }

        span {
          font-size: 30px;
        }
      }

      .money {
        margin-top: 20px;

        p {
          display: inline;
          font-size: 26px;
          color: #ae7f35;
        }

        span {
          font-size: 13px;
        }

        .longLine {
          display: inline-block;
          width: 50px;
          height: 1px;
          background: #ae7f35;
          margin-right: 30px;
        }

        .shortLine {
          display: inline-block;
          width: 30px;
          height: 1px;
          background: #ae7f35;
        }
      }

      .aboutus {
        text-align: center;
        margin-top: 30px;
        padding: 10px;
        border: 1px solid #ae7f354d;

        img {
          height: 40px;
        }

        p {
          font-size: 14px;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>