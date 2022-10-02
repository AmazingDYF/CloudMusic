<template>
  <ul class="playList">
    <li v-for="item in list" :key="item.id">
      <van-image
        :style="{ verticalAlign: 'middle', float: 'left' }"
        round
        radius="5px"
        width="50px"
        height="50px"
        :src="item.coverImgUrl"
      />
      <div class="right">
        <p class="playName">
          {{ item.name }}
        </p>
        <p class="playInfo">{{ item.trackCount }}首</p>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: "MyPlayList",
  data() {
    return {};
  },
  props: {
    list: Array,
  },
};
</script>
<style lang="less" scoped>
.playList {
  margin-top: 30px;
  height: 490px;
  overflow: auto;
  -webkit-box-orient: vertical;
  li {
    list-style: none;
    padding: 10px;
    height: 50px;
    font-size: 20px;
    .right {
      margin-left: 60px;
      width: 80%;
      height: 100%;
      p {
        // float: left;
        margin: 0;
      }
      .playName {
        line-height: 25px;
        font-size: 18px;
        width: 220px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .playInfo {
        line-height: 25px;
        font-size: 15px;
        color: rgb(164, 167, 167);
        width: 220px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>
