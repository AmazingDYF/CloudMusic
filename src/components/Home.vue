<template>
  <div class="container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
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
      <van-grid-item>
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
      ><van-grid-item>
        <template #icon>
          <van-icon
            class="iconfont girdIcon"
            class-prefix="icon"
            name="paihangbang"
          />
        </template>
        <template #text> <span class="girdText">排行榜</span> </template>
      </van-grid-item>
      <van-grid-item>
        <template #icon>
          <van-icon
            class="iconfont girdIcon"
            class-prefix="icon"
            name="geshou"
          />
        </template>
        <template #text> <span class="girdText">歌手</span> </template>
      </van-grid-item>
    </van-grid>
    <div class="recommended">
      <h3>
        推荐歌单<van-button
          class="btn"
          plain="true"
          icon="arrow"
          icon-position="right"
          round
          size="mini"
          type="default"
          text="更多"
        ></van-button>
      </h3>
      <van-grid :border="false" :column-num="4">
        <van-grid-item>
          <van-image
            radius="15px"
            class="recommended-img"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
          />
          <span class="recommended-text">歌手发萨法沙发沙发的撒</span>
        </van-grid-item>
        <van-grid-item>
          <van-image
            radius="15px"
            class="recommended-img"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
          />
          <span class="recommended-text">歌手发萨法沙发沙发的撒</span>
        </van-grid-item>
        <van-grid-item>
          <van-image
            radius="15px"
            class="recommended-img"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
          />
          <span class="recommended-text">歌手发萨法沙发沙发的撒</span>
        </van-grid-item>
        <van-grid-item>
          <van-image
            radius="15px"
            class="recommended-img"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg"
          />
          <span class="recommended-text">歌手</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="recommended">
      <h3>
        热门音乐<van-button
          class="btn"
          plain="true"
          icon="play"
          round
          size="mini"
          type="default"
          text="更多"
        ></van-button>
      </h3>
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
      >
        <van-cell v-for="item in list" :key="item">
          <p :class="item.state ? 'author' : ''">
            <van-image
              :style="{ verticalAlign: 'middle' }"
              round
              radius="5px"
              width="40px"
              height="40px"
              src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
            />
            {{ item.name }}<span>-{{ item.author }}</span>
            <van-icon
              class="iconfont playIcon"
              class-prefix="icon"
              name="gengduo-shuxiang"
              size="25px"
              @click="show = true"
            />
          </p>
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyHome",
  data() {
    return {
      list: [
        {
          img: "https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
          name: "意外",
          author: "薛之谦",
          state: false,
        },
        {
          img: "https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
          name: "意外",
          author: "薛之谦",
          state: false,
        },
        {
          img: "https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
          name: "意外",
          author: "薛之谦",
          state: false,
        },
        {
          img: "https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
          name: "意外",
          author: "薛之谦",
          state: false,
        },
        {
          img: "https://fastly.jsdelivr.net/npm/@vant/assets/logo.png",
          name: "意外",
          author: "薛之谦",
          state: false,
        },
      ],
      images: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.container {
  margin-top: 65px;
  margin-bottom: 50px;
  .recommended {
    p {
      margin: 0;
      font-size: 20px;
      span {
        color: rgb(168, 167, 167);
        font-size: 14px;
      }
      .playIcon {
        float: right;
        right: 20px;
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
