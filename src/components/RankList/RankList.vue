<template>
  <div class="list">
    <div class="header">
      <h3>
        <van-icon
          name="play"
          :style="{
            color: 'white',
            backgroundColor: 'red',
            borderRadius: '50%',
          }"
        />
        <span>播放全部</span>
      </h3>
    </div>
    <van-list
      class="songList"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        @click="addAll"
        class="cell"
        v-for="(item, index) in list"
        :key="item.al.id"
      >
        <span class="num" :class="index <= 2 ? 'redNum' : ''">
          {{ index + 1 }}
        </span>

        <div class="left">
          <p class="songName">{{ item.al.name }}</p>
          <p class="songInfo">{{ item.ar[0].name }}</p>
        </div>
        <van-icon
          class="iconfont more"
          class-prefix="icon"
          name="gengduo-shuxiang"
          :style="{ fontSize: '30px' }"
          @click="propup(item.id)"
        />
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "MyRankList",
  data() {
    return {
      // show: false,
      list: [],
      loading: false,
      finished: false,
    };
  },
  props: {
    id: Number,
  },
  methods: {
    ...mapMutations([
      "setMoreShow",
      "setMoreInfo",
      "setCurrentSong",
      "setPlayList",
    ]),
    async getList(id) {
      const { data: res } = await this.$axios.get(
        "/playlist/track/all?id=" + id + "&limit=30&offset=" + this.list.length
      );
      return res.songs;
    },
    async onLoad() {
      const arr = await this.getList(this.id);
      console.log(arr.length);
      if (arr.length == 0) {
        this.finished = true;
        return;
      }

      this.loading = false;
      this.list.push.apply(this.list, arr);
      console.log(this.list);
    },
    async getSong(id) {
      const { data: res } = await this.$axios.get("/song/detail?ids=" + id);
      return res.songs[0];
    },
    async propup(id) {
      this.setMoreShow(true);
      const song = await this.getSong(id);
      let createrArr = [];
      for (let index = 0; index < song.ar.length; index++) {
        createrArr.push(song.ar[index].name);
      }
      const obj = {
        id: id,
        name: song.name,
        singer: song.ar[0].name,
        creater: createrArr.join("/"),
        cover: song.al.picUrl,
      };
      this.setMoreInfo(obj);
    },
    addAll() {
      let arr = [];
      for (const key of this.list) {
        console.log(key);
        const obj = {
          id: key.id,
          name: key.al.name,
          singer: key.ar[0].name,
          state: false,
          cover: key.al.picUrl,
        };
        arr.push(obj);
      }
      arr[0].state = true;
      this.setPlayList(arr);
      this.setCurrentSong(arr[0]);
    },
  },
};
</script>

<style lang="less" scoped>
/* .list {
  width: 100%;
} */
.header {
  height: 50px;
  padding-left: 25px;
  line-height: 50px;
  background-color: rgb(252, 249, 249);
  margin-top: 10px;
  h3 {
    padding-left: 2px;
    width: 100%;
    height: 100%;
    span {
      display: inline-block;
      height: 100%;
      padding-left: 5px;
    }
  }
}

.songList {
  //   margin-top: 10px;
  margin-bottom: 60px;
  height: 425px;
  overflow: scroll; //超出的文本隐藏
  -webkit-box-orient: vertical;
  .cell {
    box-sizing: border-box;
    // padding: 2px 0;
    list-style: none;
    // height: 54px;
    border: 0;
    .redNum {
      color: red;
    }
    .num {
      float: left;
      width: 35px;
      height: 100%;
      text-align: center;
      font-size: 18px;
      line-height: 50px;
    }
    .left {
      box-sizing: border-box;
      display: inline-block;
      margin-left: 20px;
      width: 65%;
      height: 100%;
      padding: 2px 0;
      p {
        margin: 0;
        padding: 0;
      }
      .songName {
        font-size: 15px;
        line-height: 25px;
        overflow: hidden; // 溢出部分隐藏
        white-space: nowrap; // 文字不换行
        text-overflow: ellipsis; // 显示省略号
      }
      .songInfo {
        // line-height: 20px;
        font-size: 12px;
        line-height: 25px;
        color: rgb(180, 182, 182);
      }
    }
    .more {
      float: right;
      //   top: -50px;
      height: 100%;
      line-height: 50px;
    }
  }
}
</style>
