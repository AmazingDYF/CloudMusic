<template>
  <div class="header">
    <van-icon name="arrow-left" @click="goBack" />
    <span>歌手分类</span>
  </div>
  <div class="singerList">
    <van-tabs v-model:active="active" animated>
      <van-tab>
        <template #title> <p @click="getSingerList(7)">华语</p> </template>
        <template #default><my-singer :area="7"></my-singer></template>
      </van-tab>
      <van-tab>
        <template #title> <p @click="getSingerList(96)">欧美</p> </template>
        <template #default> <my-singer :area="96"></my-singer></template>
      </van-tab>
      <van-tab>
        <template #title> <p @click="getSingerList(8)">日本</p> </template>
        <template #default><my-singer :area="8"></my-singer></template>
      </van-tab>
      <van-tab>
        <template #title> <p @click="getSingerList(16)">韩国</p> </template>
        <template #default><my-singer :area="16"></my-singer></template>
      </van-tab>
    </van-tabs>
  </div>

  <my-footer></my-footer>
</template>
<script>
import MyFooter from "../components/common/Footer.vue";
import MySinger from "../components/searchResult/Singer.vue";
// import { goBack } from "../components/util/index";
export default {
  name: "MySingerClass",
  data() {
    return {};
  },
  components: {
    MyFooter,
    MySinger,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {},
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
.singerList {
  margin: auto;
  margin-top: 60px;
  width: 80%;
}
</style>
