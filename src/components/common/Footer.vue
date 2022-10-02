<template>
  <div class="footer">
    <van-image
      @click="detail"
      class="musicPIC"
      round
      width="40px"
      height="40px"
      fit="cover"
      position="left"
      :src="currentSong.cover"
    />
    <span class="musicName" @click="detail">{{ currentSong.name }}</span>

    <van-circle
      class="play"
      v-model:current-rate="rate"
      :rate="rate"
      layer-color="rgb(216, 213, 213)"
      color="rgb(145, 143, 143)"
      :stroke-width="60"
      @click="playing"
      size="25px"
    >
      <template #default>
        <van-icon class="icon" v-if="status" name="pause" />
        <van-icon v-else name="play" />
      </template>
    </van-circle>

    <!-- 通过 class-prefix 指定类名为 my-icon -->
    <van-icon
      class="iconfont musicList"
      class-prefix="icon"
      name="bofangduilie"
      @click="setShow(true)"
    />
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "MyFooter",
  data() {
    return {
      src: require("../../assets/audio/cmsj.mp3"),
    };
  },
  computed: {
    ...mapState(["rate", "status", "audio", "currentSong"]),
  },
  methods: {
    ...mapMutations(["setStatus", "setShow", "setTotalTime"]),
    dateFor(timeDisplay) {
      let minute = timeDisplay / 60;
      let minutes = parseInt(minute);
      const m = minutes;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      //秒
      let second = timeDisplay % 60;
      let seconds = Math.round(second);
      const s = seconds;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return { process: m * 60 + s, time: minutes + ":" + seconds };
    },
    playing() {
      console.log("status:" + this.status);
      if (!this.status) {
        // this.$refs.myaudio.play();
        this.$store.state.audio.play();
        this.setStatus(true);
      } else {
        // this.$refs.myaudio.pause();
        this.$store.state.audio.pause();
        this.setStatus(false);
      }
    },
    //跳转detail页面
    detail() {
      const durrObj = this.dateFor(this.audio.duration);
      this.setTotalTime(durrObj.time);
      this.$router.push("/detail");
    },
  },
  mounted() {
    console.log(this.rate);

    /* const currObj = this.dateFor(this.$refs.myaudio.currentTime);
    const durrObj = this.dateFor(this.$refs.myaudio.duration);
    const total = currObj.process / durrObj.process; //当前播放时间
    this.currentTime = currObj.time;
    this.totalTime = durrObj.time;
    this.rate = (total * 100).toFixed(0);
    console.log(this.rate); */
  },

  components: {},
};
</script>
<style lang="less" scoped>
.footer {
  background-color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-top: solid rgb(201, 198, 198) 1px;
  z-index: 999;

  .musicName {
    display: inline-block;
    width: 50%;
    margin-left: 20px;
    font-size: 15px;
    /* 强制不换行 */
    white-space: nowrap;
    /* 文字用省略号代替超出的部分 */
    text-overflow: ellipsis;
    /* 匀速溢出内容，隐藏 */
    overflow: hidden;
  }
  .musicPIC {
    margin-left: 20px;
    margin-top: -4px;
    vertical-align: top;
  }
  .play {
    float: right;
    right: 70px;
    margin-top: 7.5px;
    line-height: 25px;
  }
  .musicList {
    float: right;
    right: 4px;
    font-size: 22px;
  }
}
</style>
