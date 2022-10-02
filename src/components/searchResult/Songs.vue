<template>
  <div class="header">
    <h3>
      <van-icon
        name="play"
        :style="{ color: 'white', backgroundColor: 'red', borderRadius: '50%' }"
      />
      播放全部
    </h3>
  </div>
  <van-list
    class="songList"
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell @click="addAll" v-for="item in list" :key="item.id">
      <div class="left">
        <p class="songName">
          {{ item.name }}
        </p>
        <p class="songInfo">{{ item.ar[0].name }}</p>
      </div>
      <van-icon
        class="iconfont more"
        class-prefix="icon"
        name="gengduo-shuxiang"
        :style="{
          fontSize: '30px',
          height: '50px',
          lineHeight: '50px',
          float: 'right',
        }"
        @click="propup(item.id)"
      />
    </van-cell>
  </van-list>
</template>
<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "MySong",
  data() {
    return {
      songList: [],
    };
  },
  props: {
    list: Array,
  },
  computed: {
    ...mapState(["playList"]),
  },
  methods: {
    ...mapMutations([
      "setPlayList",
      "addPlayList",
      "setMoreShow",
      "setMoreInfo",
      "setCurrentSong",
    ]),
    async getSong(id) {
      const { data: res } = await this.$axios.get("/song/detail?ids=" + id);
      return res.songs[0];
    },
    //TODO
    async propup(id) {
      this.setMoreShow(true);
      const song = await this.getSong(id);
      let createrArr = [];
      for (let index = 0; index < song.ar.length; index++) {
        createrArr.push(song.ar[index].name);
      }
      /* for (const key in song.ar) {
        console.log(song.ar);
        
      } */

      const obj = {
        id: id,
        name: song.name,
        singer: song.ar[0].name,
        creater: createrArr.join("/"),
        cover: song.al.picUrl,
      };
      console.log(obj);
      this.setMoreInfo(obj);
    },
    async getSrc(id) {
      const { data: res } = await this.$axios.get("/song/url?id=" + id);
      return res.data[0].url;
    },
    addAll() {
      let arr = [];
      for (const key of this.list) {
        console.log(key);
        const obj = {
          id: key.id,
          name: key.name,
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
  created() {
    console.log(this.list);
  },
};
</script>

<style lang="less" scoped>
.header {
  margin-top: 30px;
  border-bottom: solid 1px rgb(173, 172, 172);
}

.songList {
  margin-bottom: 60px;
  height: 425px;
  overflow: scroll; //超出的文本隐藏
  -webkit-box-orient: vertical;
  /*  li {
    padding: 4px 0;
    list-style: none;
    height: 50px;
    border-bottom: solid 1px rgb(170, 169, 169);
    .left {
      display: inline-block;
      width: 80%;
      p {
        margin: 0;
        padding: 3px 0;
      }
      .songName {
        // font-size: 18px;
      }
      .songInfo {
        font-size: 12px;
        color: rgb(180, 182, 182);
      }
    }

    .more {
      float: right;
      //   top: -50px;
      height: 100%;
      line-height: 50px;
    }
  } */

  .left {
    display: inline-block;
    box-sizing: border-box;
    width: 80%;
    height: 50px;
    p {
      margin: 0;
      padding: 0;
    }
    .songName {
      font-size: 15px;
      line-height: 30px;
    }
    .songInfo {
      font-size: 12px;
      line-height: 20px;
      color: rgb(180, 182, 182);
    }
  }
}
</style>
