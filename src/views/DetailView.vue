<template>
  <div class="detail">
    <div class="header">
      <van-icon @click="goBack" class="down" name="arrow-down" size="25px" />
      <p class="musicDetail">
        <span class="songName">{{ currentSong.name }}</span>
        <span class="singer">{{ currentSong.singer }}</span>
      </p>
      <van-icon name="star" class="shape" size="25px" />
    </div>

    <component
      :is="conName"
      :paused="status"
      :time="$store.state.currentTime"
      :src="currentSong.cover"
      :id="currentSong.id"
      @click="conversion"
    ></component>

    <div class="bottom">
      <span class="left">{{ $store.state.currentTime }}</span
      ><van-progress
        :percentage="$store.state.rate"
        stroke-width="3"
        :show-pivot="false"
        color="linear-gradient(to right, #be99ff, #7232dd)"
        :style="{ width: '70%', margin: 'auto' }"
      /><span class="right">{{ $store.state.totalTime }}</span>
      <van-grid column-num="5" :border="false" :style="{ width: '100%' }">
        <van-grid-item>
          <template #icon>
            <!-- 通过 class-prefix 指定类名为 my-icon -->
            <van-icon
              v-if="circulate == 1"
              class="iconfont"
              class-prefix="icon"
              name="xunhuanbofang"
              @click="loopPlay"
              :style="{ fontSize: '30px' }"
            />
            <van-icon
              v-if="circulate == 2"
              class="iconfont"
              class-prefix="icon"
              name="suijibofang"
              @click="loopPlay"
              :style="{ fontSize: '30px' }"
            />
            <van-icon
              v-if="circulate == 3"
              class="iconfont"
              class-prefix="icon"
              name="danquxunhuan"
              @click="loopPlay"
              :style="{ fontSize: '30px' }"
            />
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <!-- 通过 class-prefix 指定类名为 my-icon -->
            <van-icon
              @click="previous"
              class="iconfont"
              class-prefix="icon"
              name="shangyishou"
              :style="{ fontSize: '40px' }"
            />
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <!-- 通过 class-prefix 指定类名为 my-icon -->
            <van-icon
              v-if="status"
              class="iconfont"
              class-prefix="icon"
              name="bofang"
              @click="playing"
              :style="{ fontSize: '50px' }"
            />
            <van-icon
              v-else
              class="iconfont"
              class-prefix="icon"
              name="bofang1"
              @click="playing"
              :style="{ fontSize: '50px' }"
            />
          </template>
        </van-grid-item>
        <van-grid-item>
          <template #icon>
            <!-- 通过 class-prefix 指定类名为 my-icon -->
            <van-icon
              @click="next"
              class="iconfont"
              class-prefix="icon"
              name="xiayishou"
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
              name="bofangduilie"
              @click="setShow(true)"
              :style="{ fontSize: '30px' }"
            />
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import MyContent from "../components/detail/Mcontent.vue";
import MySubContent from "../components/detail/SubContent.vue";
import { mapMutations, mapState } from "vuex";
import { dateFor, sleep } from "../components/util/index";
export default {
  name: "MyDetail",
  data() {
    return {
      songName: "",
      singer: "",
      conName: "MyContent",
    };
  },
  methods: {
    ...mapMutations([
      "setShow",
      "setStatus",
      "setCirculate",
      "setTotalTime",
      "setPlayList",
      "setCurrentSong",
    ]),
    conversion() {
      if (this.conName == "MyContent") {
        this.conName = "MySubContent";
      } else if (this.conName == "MySubContent") {
        this.conName = "MyContent";
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    loopPlay() {
      if (this.circulate == 1) {
        this.setCirculate(2);
      } else if (this.circulate == 2) {
        this.setCirculate(3);
      } else if (this.circulate == 3) {
        this.setCirculate(1);
      }
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
    previous() {
      if (this.playList.length > 0) {
        let index = this.playList.findIndex((item) => item.state);
        let arr = this.playList;
        arr[index].state = false;
        this.setPlayList(arr);
        if (index == 0) {
          index = this.playList.length - 1;
        } else {
          index -= 1;
        }
        arr[index].state = true;
        this.setPlayList(arr);
        this.setCurrentSong(this.playList[index]);
      }
    },
    next() {
      if (this.playList.length > 1) {
        let index = this.playList.findIndex((item) => item.state);
        let arr = this.playList;
        arr[index].state = false;
        this.setPlayList(arr);
        if (index == this.playList.length - 1) {
          index = 0;
        } else {
          index += 1;
        }
        arr[index].state = true;
        this.setPlayList(arr);
        this.setCurrentSong(this.playList[index]);
      }
    },
  },
  computed: {
    ...mapState(["show", "status", "circulate", "playList", "currentSong"]),
  },
  components: { MyContent, MySubContent },
  created() {
    const currentPlay = this.playList.find((item) => {
      return item.state;
    });
    this.songName = currentPlay.name;
    this.singer = currentPlay.singer;
  },
  async mounted() {
    await sleep(100);
    const durrObj = dateFor(this.$store.state.audio.duration);
    this.setTotalTime(durrObj.time);
  },
};
</script>
<style lang="less" scoped>
.detail {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(76, 76, 76);
  .header {
    width: 100%;
    height: 60px;
    line-height: 0px;
    color: white;
    .down {
      height: 100%;
      line-height: 60px;
      float: left;
      left: 25px;
    }
    .musicDetail {
      display: block;
      width: 70%;
      height: 100%;
      margin: auto;

      text-align: center;
      .songName {
        display: inline-block;
        width: 100%;
        font-size: 20px;
        line-height: 35px;
        overflow: hidden; // 溢出部分隐藏
        white-space: nowrap; // 文字不换行
        text-overflow: ellipsis; // 显示省略号
        color: white;
      }
      .singer {
        display: inline-block;
        width: 100%;
        line-height: 25px;
        font-size: 15px;
      }
    }
    .shape {
      position: absolute;
      height: 60px;
      line-height: 60px;
      // float: right;
      right: 25px;
      top: 0;
    }
  }

  .bottom {
    width: 100%;
    position: fixed;
    bottom: 0;
    // background-color: rgb(76, 76, 76);

    .left {
      position: relative;
      top: 10px;
      left: 10px;
    }
    .right {
      float: right;
      position: relative;
      top: -10px;
      right: 10px;
    }
  }
}
</style>
