<template>
  <my-header></my-header>
  <div class="container">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      :style="{ width: '90%', margin: 'auto', borderRadius: '10px' }"
    >
      <van-swipe-item v-for="item in banners" :key="item.bannerId">
        <img :src="item.pic" />
      </van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item>
        <template #icon>
          <van-icon
            class="iconfont girdIcon"
            class-prefix="icon"
            name="tuijian"
          />
        </template>
        <template #text><span class="girdText">每日推荐</span></template>
      </van-grid-item>
      <van-grid-item @click="toSquareList">
        <template #icon>
          <van-icon
            class="iconfont girdIcon"
            class-prefix="icon"
            name="gedan"
          />
        </template>
        <template #text>
          <span class="girdText">歌单</span>
        </template> </van-grid-item
      ><van-grid-item @click="toRankList">
        <template #icon>
          <van-icon
            class="iconfont girdIcon"
            class-prefix="icon"
            name="paihangbang"
          />
        </template>
        <template #text> <span class="girdText">排行榜</span> </template>
      </van-grid-item>
      <van-grid-item @click="toSingerClass">
        <template #icon>
          <van-icon
            class="iconfont girdIcon"
            class-prefix="icon"
            name="geshou"
          />
        </template>
        <template #text>
          <span class="girdText">歌手</span>
        </template>
      </van-grid-item>
    </van-grid>
    <div class="recommended">
      <h3>
        推荐歌单<van-button
          @click="toSquareList"
          class="btn"
          plain
          icon="arrow"
          icon-position="right"
          round
          size="mini"
          type="default"
          text="更多"
        ></van-button>
      </h3>
      <van-grid :border="false" :column-num="4">
        <van-grid-item
          v-for="item in recommedList"
          :key="item.id"
          @click="toPlayListDetail(item.id)"
        >
          <van-image radius="15px" class="recommended-img" :src="item.picUrl" />
          <span class="recommended-text">{{ item.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="recommended">
      <h3>
        新歌<van-button
          class="btn"
          plain
          icon="play"
          round
          size="mini"
          type="default"
          text="更多"
        ></van-button>
      </h3>
      <van-list :loading="false" :finished="true" finished-text="没有更多了">
        <van-cell v-for="item in newSongs" :key="item.id">
          <p @click="addAll" :class="item.state ? 'author' : ''">
            <van-image
              :style="{ verticalAlign: 'middle' }"
              round
              radius="5px"
              width="40px"
              height="40px"
              :src="item.picUrl"
            />
            {{ item.song.name }}<span>-{{ item.song.artists[0].name }}</span>
          </p>
          <van-icon
            class="iconfont playIcon"
            class-prefix="icon"
            name="gengduo-shuxiang"
            size="25px"
            @click="propup(item.song.id)"
          />
        </van-cell>
      </van-list>
    </div>
  </div>
  <my-footer></my-footer>
</template>
<script>
import MyHeader from "../components/common/Header";
import MyFooter from "../components/common/Footer.vue";
import { mapMutations } from "vuex";
export default {
  name: "MyHome",
  data() {
    return {
      newSongs: [],
      banners: [],
      recommedList: [],
    };
  },
  methods: {
    ...mapMutations([
      "setMoreShow",
      "setMoreInfo",
      "setCurrentSong",
      "setPlayList",
    ]),

    async getBanners() {
      const { data: res } = await this.$axios.get("/banner?type=1");
      console.log(res.banners);
      this.banners = res.banners;
    },
    async getNewSong() {
      const { data: res } = await this.$axios.get("/personalized/newsong");
      this.newSongs = res.result;
    },
    async getRecommedList() {
      const { data: res } = await this.$axios.get("/personalized?limit=4");
      this.recommedList = res.result;
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
      for (const key of this.newSongs) {
        console.log(key);
        const obj = {
          id: key.id,
          name: key.song.name,
          singer: key.song.artists[0].name,
          state: false,
          cover: key.picUrl,
        };
        arr.push(obj);
      }
      arr[0].state = true;
      this.setPlayList(arr);
      this.setCurrentSong(arr[0]);
    },
    toSingerClass() {
      this.$router.push("/singerClass");
    },
    toRankList() {
      this.$router.push("/rank");
    },
    toPlayListDetail(id) {
      this.$router.push({ name: "pld", params: { id: id } });
    },
    toSquareList() {
      this.$router.push("/squareList");
    },
  },
  components: {
    MyHeader,
    MyFooter,
  },
  created() {
    this.getBanners();
    this.getNewSong();
    this.getRecommedList();
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 65px;
  margin-bottom: 50px;
  .recommended {
    p {
      float: left;
      width: 90%;
      margin: 0;
      font-size: 20px;
      span {
        color: rgb(168, 167, 167);
        font-size: 14px;
      }
      .playIcon {
        float: right;
        right: 20px;
        height: 100%;
        line-height: 40px;
      }
    }
    h3 {
      margin-left: 20px;
      .btn {
        float: right;
        right: 15px;
      }
    }
  }
  .girdIcon {
    width: 40px;
    height: 40px;
    line-height: 35px;
    font-size: 25px;
    text-align: center;
    color: red;
    border-radius: 50%;
    background-color: pink;
  }
  .girdText {
    font-size: 15px;
    color: rgb(199, 196, 196);
  }
  .recommended-text {
    height: 32px;
    font-size: 10px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    display: -webkit-box;
    -webkit-line-clamp: 2; // 超出多少行
    -webkit-box-orient: vertical;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    height: 150px;
    text-align: center;
    background-color: #39a9ed;
    img {
      width: 100%;
      height: 150px;
    }
  }
}
</style>
