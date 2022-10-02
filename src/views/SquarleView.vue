<template>
  <div class="squarle">
    <div class="header">
      <van-icon name="arrow-left" @click="goBack" />
      <span>歌单</span>
    </div>
    <div class="squarlList">
      <van-tabs v-model:active="active" animated>
        <van-tab>
          <template #title> 全部 </template>
          <template #default
            ><my-play-square-list :cat="'全部'"></my-play-square-list
          ></template>
        </van-tab>
        <van-tab>
          <template #title> 华语 </template>
          <template #default>
            <my-play-square-list :cat="'华语'"></my-play-square-list
          ></template>
        </van-tab>
        <van-tab>
          <template #title> 古风 </template>
          <template #default
            ><my-play-square-list :cat="'古风'"></my-play-square-list
          ></template>
        </van-tab>
        <van-tab>
          <template #title> 欧美 </template>
          <template #default
            ><my-play-square-list :cat="'欧美'"></my-play-square-list
          ></template>
        </van-tab>
        <van-tab>
          <template #title> 流行 </template>
          <template #default
            ><my-play-square-list :cat="'流行'"></my-play-square-list
          ></template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
  <my-footer></my-footer>
</template>
<script>
import MyPlaySquareList from "../components/PlayList/PlaySquareList.vue";
import MyFooter from "../components/common/Footer.vue";
export default {
  name: "MySquare",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  components: {
    MyPlaySquareList,
    MyFooter,
  },
};
</script>
<style lang="less" scoped>
.squarle {
  margin: auto;
  width: 90%;
  .header {
    position: fixed;
    top: 0;
    padding-left: 20px;
    width: 100%;
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
  .squarlList {
    /* position: fixed;
      top: 80; */
    margin-top: 60px;
    margin-bottom: 50px;
  }
}
</style>
