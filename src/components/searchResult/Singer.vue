<template>
  <van-list
    class="signerList"
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell class="cell" v-for="item in list" :key="item.id">
      <van-image
        :style="{ verticalAlign: 'middle', float: 'left' }"
        round
        width="50px"
        height="50px"
        :src="item.picUrl"
      />
      <span>{{ item.name }}</span>
    </van-cell>
  </van-list>
  <!-- <ul class="signerList">
    <li v-for="item in list" :key="item.id">
      <van-image
        :style="{ verticalAlign: 'middle', float: 'left' }"
        round
        width="50px"
        height="50px"
        :src="item.picUrl"
      />
      <span>{{ item.name }}</span>
    </li>
  </ul> -->
</template>
<script>
// import { mapState } from "vuex";
export default {
  name: "MySinger",
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
    };
  },
  props: {
    area: Number,
    keyword: String,
  },
  methods: {
    async onLoad() {
      if (typeof this.area !== "undefined") {
        if (this.list.length % 30 === 0) {
          const { data: res } = await this.$axios.get(
            "/artist/list?type=1&area=" +
              this.area +
              "&initial=b&offset=" +
              this.list.length +
              "&limit=30"
          );
          this.list.push.apply(this.list, res.artists);

          console.log(this.list);
          if (res.artists.length == 0) {
            this.finished = true;
          }
        }
        this.loading = false;
        return;
      }

      const { data: res } = await this.$axios.get(
        "/cloudsearch?keywords=" +
          this.keyword +
          "&type=100&offset=" +
          this.list.length
      );
      this.loading = false;
      if (res.result.artists.length == 0) {
        this.finished = true;
      }
      this.list.push.apply(this.list, res.result.artists);
    },
  },
  created() {},
};
</script>
<style lang="less" scoped>
.signerList {
  margin-top: 30px;
  height: 490px;
  overflow: auto;
  -webkit-box-orient: vertical;
  .cell {
    padding: 5px;
    height: 60px;
    line-height: 50px;
    span {
      margin-left: 15px;
      display: inline-block;
      height: 100%;
    }
  }
}
</style>
