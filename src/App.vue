<template>
  <router-view />
  <audio
    :src="src"
    ref="myaudio"
    @timeupdate="play"
    controls
    :style="{ display: 'none' }"
  ></audio>
  <van-popup
    :show="show"
    @close="setShow(false)"
    round
    closeable
    ref="showList"
    position="bottom"
    :style="{
      bottom: '50px',
      left: '50%',
      transform: 'translateX(-50%)',
      height: '70%',
      width: '90%',
      borderRadius: '15px',
    }"
  >
    <template #default>
      <h3>
        正在播放<span>({{ playList.length }})</span>
      </h3>
      <van-list
        v-model:loading="loading"
        :finished="true"
        finished-text="没有更多了"
      >
        <van-cell v-for="(item, index) in playList" :key="item">
          <p :class="item.state ? 'author' : ''">
            {{ item.name }}<span>-{{ item.singer }}</span>
          </p>
          <van-icon class="musicList" name="cross" @click="deleteSong(index)" />
        </van-cell>
      </van-list>
    </template>
  </van-popup>

  <van-popup
    v-model:show="moreShow"
    round
    @close="setMoreShow(false)"
    teleport="#app"
    position="bottom"
    :style="{ height: '500px' }"
  >
    <template #default>
      <div class="moreInfo">
        <van-image
          :style="{ verticalAlign: 'middle', float: 'left' }"
          round
          radius="5px"
          width="55px"
          height="55px"
          :src="moreInfo.cover"
        />
        <p class="songName">歌曲:{{ moreInfo.name }}</p>
        <p class="songInfo">{{ moreInfo.singer }}</p>
      </div>
      <ul class="actionList">
        <li @click="nextPlay(moreInfo.id)">
          <van-icon
            class="iconfont icon"
            class-prefix="icon"
            name="bofang1"
            :style="{ fontSize: '20px' }"
          />
          <span>下一首播放</span>
        </li>
        <li @click="show = false">
          <van-icon
            class="iconfont icon"
            class-prefix="icon"
            name="xiazai"
            :style="{ fontSize: '20px' }"
          />
          <span>下载</span>
        </li>
        <li @click="show = false">
          <van-icon
            class="iconfont icon"
            class-prefix="icon"
            name="jianyi"
            :style="{ fontSize: '23px' }"
          />
          <span>评论</span>
        </li>
        <li @click="show = false">
          <van-icon
            class="iconfont icon"
            class-prefix="icon"
            name="fenxiang"
            :style="{ fontSize: '20px' }"
          />
          <span>分享</span>
        </li>
        <li @click="show = false">
          <van-icon
            class="iconfont icon"
            class-prefix="icon"
            name="lianxiren1"
            :style="{ fontSize: '20px' }"
          />
          <span>歌手:{{ moreInfo.singer }}</span>
        </li>
        <li @click="show = false">
          <van-icon
            class="iconfont icon"
            class-prefix="icon"
            name="lianxiren"
            :style="{ fontSize: '20px' }"
          />
          <span class="creater">创作者:{{ moreInfo.creater }}</span>
        </li>
      </ul>
    </template>
  </van-popup>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { sleep, dateFor } from "./components/util/index";
export default {
  name: "App",
  data() {
    return {
      src: require("./assets/audio/cmsj.mp3"),
    };
  },
  methods: {
    ...mapMutations([
      "setCurrentTime",
      "setTotalTime",
      "setRate",
      "setStatus",
      "setAudio",
      "setShow",
      "updatePlayList",
      "setCurrentSong",
      "setPlayList",
      "setMoreShow",
      "setMoreInfo",
    ]),
    async getSrc(id) {
      const { data: res } = await this.$axios.get("/song/url?id=" + id);
      return res.data[0].url;
    },
    random(min, max) {
      //生成随机数

      return Math.floor(Math.random() * (max - min)) + min;
    },

    async play() {
      const currObj = dateFor(this.$refs.myaudio.currentTime);
      const durrObj = dateFor(this.$refs.myaudio.duration);
      const total = currObj.process / durrObj.process; //当前播放时间

      this.setCurrentTime(currObj.time);
      this.setTotalTime(durrObj.time);
      this.setRate((total * 100).toFixed(0));

      if (currObj.process == durrObj.process) {
        let index = this.playList.findIndex((item) => item.state);
        let arr = this.playList;
        this.setStatus(false);
        // this.updatePlayList(false, index);
        arr[index].state = false;
        this.setPlayList(arr);
        if (this.circulate == 1) {
          // console.log("state:" + this.playList[index + 1].state);
          // this.updatePlayList(true, index + 1);
          console.log("index:" + index + "length:" + this.playList.length - 1);
          if (index == this.playList.length - 1) {
            index = 0;
            console.log("fdgsfasdfsaf");
          } else {
            index += 1;
            console.log("不等于");
          }
          arr[index].state = true;
          this.setPlayList(arr);
          // this.src = await this.getSrc(this.playList[index + 1].id);
          this.setCurrentSong(this.playList[index]);
        } else if (this.circulate == 2) {
          const num = this.random(0, this.playList.playList - 1);
          console.log(num);
          arr[num].state = true;
          this.setPlayList(arr);
          this.setCurrentSong(this.playList[num]);
          this.src = await this.getSrc(this.playList[num].id);
        } else if (this.circulate == 3) {
          arr[index].state = true;
          this.setPlayList(arr);
          this.setCurrentSong(this.playList[index]);
        }
        /* await sleep(1000);
        this.audio.play();
        this.setStatus(true); */
      }
    },
    async getSong(id) {
      const { data: res } = await this.$axios.get("/song/detail?ids=" + id);
      return res.songs[0];
    },
    async nextPlay(id) {
      const flag = this.playList.findIndex((item) => item.id == id);
      if (flag !== -1) {
        this.setMoreShow(false);
        return;
      }
      const song = await this.getSong(id);
      const obj = {
        id: id,
        name: song.name,
        singer: song.ar[0].name,
        state: false,
        cover: song.al.picUrl,
      };
      console.log(obj);
      let index = this.playList.findIndex((item) => item.state);
      // this.playList.splice(index + 1, 0, obj);
      let arr = this.playList;
      index += 1;
      arr.splice(index, 0, obj);
      console.log(arr);
      // this.addPlayList(obj, index);
      this.setPlayList(arr);

      this.setMoreShow(false);
    },
    deleteSong(index) {
      let arr = this.playList;
      arr.splice(index, 1);
      if (index >= this.playList.length - 1) {
        index = 0;
      }
      arr[index].state = true;
      this.setPlayList(arr);
      this.setCurrentSong(this.playList[index]);
    },
  },
  computed: {
    ...mapState([
      "show",
      "status",
      "show",
      "playList",
      "circulate",
      "audio",
      "currentSong",
      "moreShow",
      "moreInfo",
    ]),
  },
  watch: {
    currentSong: {
      // handler 属性是固定写法 当src值发生改变时 触发handler方法
      async handler() {
        this.setStatus(false);
        const index = this.playList.findIndex((item) => item.state);
        // this.setCurrentSong(this.playList[index]);
        this.src = await this.getSrc(this.playList[index].id);
        await sleep(1000);

        this.audio.play();
        this.setStatus(true);
      },
      // 默认情况下，组件在初次加载完毕后不会调用 watch 侦听器。如果想让 watch 侦听器立即被调用，则需要使用 immediate 选项
      immediate: false,
    },
  },
  created() {},
  async mounted() {
    this.setAudio(this.$refs.myaudio);
    this.src = await this.getSrc(this.currentSong.id);
    const currObj = dateFor(this.$refs.myaudio.currentTime);
    this.setCurrentTime(currObj.time);
    const durrObj = dateFor(this.$refs.myaudio.duration);
    this.setTotalTime(durrObj.time);
  },
};
</script>

<style lang="less">
.van-popup {
  .author::before {
    content: "\e782";
    margin-right: 10px;
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  p {
    margin: 0;
    padding: 0;
    display: inline-block;
    width: 90%;
    /* 强制不换行 */
    white-space: nowrap;
    /* 文字用省略号代替超出的部分 */
    text-overflow: ellipsis;
    /* 匀速溢出内容，隐藏 */
    overflow: hidden;
  }
  h3 {
    margin-top: 5px;
    padding-left: 15px;
  }
  .author {
    color: red !important;
    font-size: 15px;
    span {
      display: inline-block;
      height: 100%;
      color: red !important;
    }
  }
  .musicList {
    float: right;
    height: 100%;
    line-height: 33.33px;
  }
  span {
    color: rgb(189, 189, 187);
    font-size: 10px;
  }
}
.moreInfo {
  height: 55px;
  padding: 15px;
  border-bottom: solid 1px rgb(201, 199, 199);
  p {
    margin: 0 0 0 15px;
    padding: 5px 0;
    float: left;
    width: 70%;
  }
  .songName {
    font-size: 18px;
    /* 强制不换行 */
    white-space: nowrap;
    /* 文字用省略号代替超出的部分 */
    text-overflow: ellipsis;
    /* 匀速溢出内容，隐藏 */
    overflow: hidden;
  }
  .songInfo {
    font-size: 12px;
    color: rgb(180, 182, 182);
  }
}
.actionList {
  li {
    list-style: none;
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    .icon {
      height: 100%;
      float: left;
    }
    span {
      display: inline-block;
      font-size: 20px;
      padding-left: 10px;
      width: 80%;
      height: 100%;
      /* 强制不换行 */
      white-space: nowrap;
      /* 文字用省略号代替超出的部分 */
      text-overflow: ellipsis;
      /* 匀速溢出内容，隐藏 */
      overflow: hidden;
    }
  }
}
&::-webkit-scrollbar {
  display: none;
}
</style>
