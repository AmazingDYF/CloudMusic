<template>
  <div class="header">
    <van-icon name="arrow-left" @click="goBack" />
    <span>排行榜</span>
  </div>
  <div class="rankList">
    <van-tabs v-model:active="active" animated>
      <van-tab>
        <template #title> 飙升榜 </template>
        <template #default
          ><my-rank-list :id="19723756"></my-rank-list
        ></template>
      </van-tab>
      <van-tab>
        <template #title> 新歌榜 </template>
        <template #default>
          <my-rank-list :id="3779629"></my-rank-list
        ></template>
      </van-tab>
      <van-tab>
        <template #title> 热歌榜 </template>
        <template #default
          ><my-rank-list :id="3778678"></my-rank-list
        ></template>
      </van-tab>
      <van-tab>
        <template #title> 原创榜 </template>
        <template #default
          ><my-rank-list :id="2884035"></my-rank-list
        ></template>
      </van-tab>
    </van-tabs>
  </div>

  <my-footer></my-footer>
</template>
<script>
import MyRankList from "../components/RankList/RankList.vue";
import MyFooter from "../components/common/Footer.vue";
export default {
  name: "MyRank",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  components: {
    MyRankList,
    MyFooter,
  },
};
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  margin: auto;
  padding-left: 40px;

  height: 50px;
  line-height: 50px;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.8);
  color: rgb(20, 20, 20);

  span {
    display: inline-block;
    margin-left: 15px;
    height: 100%;
  }
}
.rankList {
  margin: auto;
  margin-top: 60px;
  width: 80%;
}
</style>
