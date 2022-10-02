<template>
  <div class="list">
    <div class="header">
      <h3>
        <van-icon
          name="play"
          :style="{
            color: 'white',
            backgroundColor: 'red',
            borderRadius: '50%',
          }"
        />
        播放全部
      </h3>
    </div>
    <ul class="songList">
      <li v-for="(item, index) in list" :key="item">
        <span class="num" :class="index <= 2 ? 'redNum' : ''">
          {{ index + 1 }}
        </span>

        <div class="left">
          <p class="songName">
            {{ item.name }}
          </p>
          <p class="songInfo">{{ item.author }}</p>
        </div>
        <van-icon
          class="iconfont more"
          class-prefix="icon"
          name="gengduo-shuxiang"
          :style="{ fontSize: '30px' }"
          @click="show = true"
        />
      </li>
    </ul>
    <van-popup
      v-model:show="show"
      round
      teleport="#app"
      position="bottom"
      :style="{ height: '500px' }"
    >
      <template #default>
        <div class="moreInfo">
          <van-image
            :style="{ verticalAlign: 'middle', float: 'left' }"
            round
            radius="5px"
            width="55px"
            height="55px"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
          />
          <p class="songName">歌曲:沉默是金</p>
          <p class="songInfo">张国荣</p>
        </div>
        <ul class="actionList">
          <li @click="show = false">
            <van-icon
              class="iconfont icon"
              class-prefix="icon"
              name="bofang1"
              :style="{ fontSize: '20px' }"
            />
            <span>下一首播放</span>
          </li>
          <li @click="show = false">
            <van-icon
              class="iconfont icon"
              class-prefix="icon"
              name="xiazai"
              :style="{ fontSize: '20px' }"
            />
            <span>下载</span>
          </li>
          <li @click="show = false">
            <van-icon
              class="iconfont icon"
              class-prefix="icon"
              name="jianyi"
              :style="{ fontSize: '23px' }"
            />
            <span>评论</span>
          </li>
          <li @click="show = false">
            <van-icon
              class="iconfont icon"
              class-prefix="icon"
              name="fenxiang"
              :style="{ fontSize: '20px' }"
            />
            <span>分享</span>
          </li>
          <li @click="show = false">
            <van-icon
              class="iconfont icon"
              class-prefix="icon"
              name="lianxiren1"
              :style="{ fontSize: '20px' }"
            />
            <span>歌手</span>
          </li>
          <li @click="show = false">
            <van-icon
              class="iconfont icon"
              class-prefix="icon"
              name="lianxiren"
              :style="{ fontSize: '20px' }"
            />
            <span>创作者</span>
          </li>
        </ul>
      </template>
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "MySong",
  data() {
    return {
      show: false,
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
    };
  },
};
</script>

<style lang="less" scoped>
.list {
  width: 80%;
  margin: auto;
}
.header {
  position: sticky;
  top: 50px;
  height: 50px;
  line-height: 50px;
  background-color: white;
  margin-top: 30px;
  // border-bottom: solid 1px rgb(173, 172, 172);
}

.songList {
  margin-top: 20px;
  margin-bottom: 60px;
  height: 495px;
  overflow: scroll; //超出的文本隐藏
  -webkit-box-orient: vertical;
  li {
    box-sizing: border-box;
    padding: 2px 0;
    list-style: none;
    height: 54px;
    // border-bottom: solid 1px rgb(170, 169, 169);
    .redNum {
      color: red;
    }
    .num {
      float: left;
      width: 10px;
      height: 100%;
      font-size: 18px;
      line-height: 50px;
    }
    .left {
      box-sizing: border-box;
      display: inline-block;
      margin-left: 20px;
      width: 80%;
      height: 100%;
      padding: 2px 0;
      p {
        margin: 0;
        padding: 0;
      }
      .songName {
        font-size: 15px;
        line-height: 30px;
      }
      .songInfo {
        // line-height: 20px;
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
  }
}
.moreInfo {
  height: 55px;
  padding: 15px;
  border-bottom: solid 1px rgb(201, 199, 199);
  p {
    margin: 0 0 0 15px;
    padding: 5px 0;
    float: left;
    width: 70%;
  }
  .songName {
    font-size: 18px;
  }
  .songInfo {
    font-size: 12px;
    color: rgb(180, 182, 182);
  }
}
.actionList {
  li {
    list-style: none;
    padding-left: 10px;
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    .icon {
      height: 100%;
    }
    span {
      display: inline-block;
      font-size: 20px;
      padding-left: 10px;
      height: 100%;
    }
  }
}
</style>
