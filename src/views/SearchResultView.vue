<template>
  <my-header></my-header>
  <div class="SearchResult">
    <van-tabs v-model:active="active" animated>
      <van-tab>
        <template #title> <p @click="getList(1)">单曲</p> </template>
        <template #default><my-song :list="songList.songs"></my-song></template>
      </van-tab>
      <van-tab>
        <template #title> <p @click="getList(1000)">歌单</p> </template>
        <template #default>
          <my-play-list :list="playlist.playlists"></my-play-list
        ></template>
      </van-tab>
      <van-tab>
        <template #title> <p>歌手</p> </template>
        <template #default><my-singer :keyword="keyword"></my-singer></template>
      </van-tab>
    </van-tabs>
  </div>
  <my-footer></my-footer>
</template>
<script>
import MyHeader from "../components/common/Header";
import MyFooter from "../components/common/Footer.vue";
import MySong from "../components/searchResult/Songs.vue";
import MyPlayList from "../components/searchResult/PlayList.vue";
import MySinger from "../components/searchResult/Singer.vue";
export default {
  name: "MySearchResult",
  data() {
    return {
      keyword: "",
      songList: { songs: [] },
      playlist: { playlists: [] },
      artlist: { artists: [] },
    };
  },
  props: {},
  methods: {
    async getList(type) {
      let offset = 0;

      if (type === 1 && this.songList.songs.length !== 0) {
        offset = this.songList.songs.length;
      } else if (type === 1000 && this.playlist.playlists.length !== 0) {
        offset = this.playlist.playlists.length;
      } else if (type === 100 && this.artlist.artists.length !== 0) {
        offset = this.artlist.artists.length;
      }

      const { data: res } = await this.$axios.get(
        "/cloudsearch?keywords=" +
          this.keyword +
          "&type=" +
          type +
          "&offset=" +
          offset
      );
      if (type == 1) {
        this.songList = res.result;
      } else if (type == 100) {
        this.artlist = res.result;
      } else if (type == 1000) {
        this.playlist = res.result;
      }
    },
  },
  created() {
    this.keyword = this.$route.params.keyword;
    this.getList(1);
  },
  components: {
    MyHeader,
    MyFooter,
    MySong,
    MyPlayList,
    MySinger,
  },
};
</script>
<style lang="less" scoped>
.SearchResult {
  width: 80%;
  margin: 60px auto 0;
}
</style>
