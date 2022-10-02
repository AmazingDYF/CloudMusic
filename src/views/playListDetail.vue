<template>
  <div class="top-box" ref="top">
    <img :src="playDetail.coverImgUrl" alt="" class="bac" />
    <div class="top-inner">
      <van-image
        class="cover"
        ref="cover"
        radius="15px"
        width="130px"
        height="130px"
        :src="playDetail.coverImgUrl"
      />
      <div class="right">
        <h4 class="name">{{ playDetail.name }}</h4>
        <span class="play">播放：{{ playDetail.playCount }}</span>
        <span class="desc" @click="show = true"
          >{{ playDetail.description }}
        </span>
      </div>
    </div>
  </div>
  <div class="header">
    <van-icon name="arrow-left" @click="goBack" />
    <span>歌单</span>
  </div>
  <my-song-list class="songs" :id="id"></my-song-list>
  <my-footer></my-footer>

  <van-popup
    class="detail"
    v-model:show="show"
    closeable
    position="right"
    :style="{
      width: '100%',
      height: '100%',
    }"
  >
    <template #default>
      <!-- <img :src="playDetail.coverImgUrl" alt="" class="bacSub" /> -->
      <div class="body">
        <van-image
          class="coverSub"
          ref="cover"
          radius="15px"
          width="200px"
          height="200px"
          :src="playDetail.coverImgUrl"
        />
        <div class="content">
          <h4 class="name">{{ playDetail.name }}</h4>
          <p class="tags">
            标签：
            <van-tag
              class="tag"
              color=""
              round
              type="primary"
              v-for="item in playDetail.tags"
              :key="item"
              >{{ item }}</van-tag
            >
          </p>
          <p class="desc">
            {{ playDetail.description }}
          </p>
        </div>
        <img :src="playDetail.coverImgUrl" alt="" class="bacSub" />
      </div>
    </template>
  </van-popup>
</template>
<script>
// import MySongList from "../components/common/SongList.vue";
import MySongList from "../components/RankList/RankList.vue";
import MyFooter from "../components/common/Footer.vue";
// import { getColor } from "../components/util/index";
export default {
  name: "MyplayListDetail",
  data() {
    return {
      show: false,
      playDetail: null,
    };
  },
  props: {
    id: Number,
  },
  components: {
    MySongList,
    MyFooter,
  },
  methods: {
    async getPlayDetail() {
      const { data: res } = await this.$axios.get(
        "/playlist/detail?id=" + this.id
      );
      this.playDetail = res.playlist;
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  created() {
    this.getPlayDetail();
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.top-box {
  display: flex;
  // background-color: royalblue;
  width: 100%;
  height: 250px;

  .bac {
    margin: 0;
    display: block;
    width: 100%;
    height: 250px;
    z-index: -1;
    filter: blur(40px); /* 高斯模糊 */
  }
  /* 定位 */
  .top-inner {
    align-self: center;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 150px;
    margin: auto;

    .cover {
      vertical-align: top;
    }
    .right {
      display: inline-block;
      width: 160px;
      margin-left: 10px;
      text-align: left;
      .name {
        margin: 0;
        margin-top: 5px;

        line-height: 30px;
        color: white;
        display: -webkit-box; //将元素设为盒子伸缩模型显示
        -webkit-box-orient: vertical; //伸缩方向设为垂直方向
        -webkit-line-clamp: 2; //超出3行隐藏，并显示省略号
        overflow: hidden;
      }
      span {
        display: block;
        font-weight: bold;
        font-size: 15px;
        line-height: 30px;
        color: rgb(196, 192, 192);
      }
      .desc {
        /* 强制不换行 */
        white-space: nowrap;
        /* 文字用省略号代替超出的部分 */
        text-overflow: ellipsis;
        /* 匀速溢出内容，隐藏 */
        overflow: hidden;
      }
    }
  }
}

.detail {
  width: 100%;
  height: 100%;

  .bacSub {
    display: block;
    width: 120%;
    height: 100%;
    position: absolute;
    top: 0;
    left: -10%;
    z-index: -1;
    filter: blur(40px);
  }
  .body {
    position: absolute;
    top: 0;
    height: 100%;
    padding-bottom: 10px;
    .coverSub {
      display: block;
      margin: auto;

      margin-top: 80px;
    }
    .content {
      margin: auto;
      width: 80%;
      color: white;

      .name {
        text-align: center;
      }
      p {
        padding: 5px 0;
      }
      .tags {
        .tag {
          margin-left: 5px;
          color: white;
          background-color: rgba(0, 0, 0, 0.2);
          font-size: 14px;
        }
      }
      .desc {
        font-size: 15px;
        line-height: 25px;
        word-break: break-all; //英文
        white-space: pre-wrap; //中文
      }
    }
  }
}

.header {
  position: fixed;
  top: 0;
  padding-left: 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  background: rgba(255, 255, 255, 0);
  color: white;
  span {
    display: inline-block;
    margin-left: 15px;
    height: 100%;
  }
}
.songs {
  margin: auto;
  width: 80%;

  :deep(.songList) {
    height: 485px !important;
  }
}
</style>
