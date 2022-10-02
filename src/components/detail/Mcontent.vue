<template>
  <div class="content">
    <div class="bar">
      <img
        class="playbar"
        :class="paused ? 'roast' : 'reverse'"
        src="../../assets/images/play-bar.png"
        alt=""
      />
    </div>

    <div class="dsic" ref="dsic" :class="paused ? 'active' : 'pause'">
      <img class="cover" :src="src" alt="" />
    </div>
    <div class="subNav">
      <van-grid column-num="3" :border="false">
        <van-grid-item>
          <template #icon>
            <!-- 通过 class-prefix 指定类名为 my-icon -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="xiazai"
              :style="{ fontSize: '30px' }"
            />
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <!-- 通过 class-prefix 指定类名为 my-icon -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="shipin"
              :style="{ fontSize: '40px' }"
            />
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <!-- 通过 class-prefix 指定类名为 my-icon -->
            <van-icon
              class="iconfont"
              class-prefix="icon"
              name="jianyi"
              :style="{ fontSize: '35px' }"
            />
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyContent",
  data() {
    return {};
  },
  props: {
    src: String,
    paused: Boolean,
  },
  methods: {},
  created() {},
};
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  // height: 100%;
  .van-grid {
    color: white;
  }
  .bar {
    position: absolute;
    left: 50%;
    margin: auto;
    top: 85px;
    width: 18%;
    height: 18%;
    z-index: 1;
    transform-origin: left top;
    transform: rotate(-28deg);
  }
  .playbar {
    width: 100%;
    height: 100%;
    transform-origin: left top;
  }
  .dsic {
    margin: 80px auto 0;
    width: 250px;
    height: 250px;
    background-image: url("../../assets/images/disc.png");
    background-size: 100%;
    background-repeat: no-repeat;
    animation-fill-mode: forwards;
    // transform: rotate(360deg);
    // animation: rotation 8s forwards linear infinite;
    .cover {
      position: relative;
      width: 180px;
      height: 180px;
      margin: auto;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
    }
  }
  .subNav {
    width: 70%;
    margin: 70px auto 0;
  }
}

@keyframes forwardRoation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(20deg);
  }
}
@keyframes reverseRoation {
  0% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.roast {
  animation: forwardRoation 1s linear forwards;
}
.reverse {
  animation: reverseRoation 1s linear forwards;
}
// 旋转动画
@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.active {
  animation: rotation 8s forwards linear infinite;
  animation-play-state: running;
}
.pause {
  animation: rotation 8s forwards linear infinite;
  animation-play-state: paused;
}
</style>
