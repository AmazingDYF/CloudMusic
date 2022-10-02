<template>
  <div class="subContent">
    <ul ref="songBox">
      <li
        v-for="(item, index) in lyric"
        :key="index"
        :class="index == lyricIndex ? 'active' : ''"
      >
        {{ item.lyric }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "SubContent",
  data() {
    return {
      lyric: [],
      lyricIndex: 0,
    };
  },
  props: {
    id: String,
    time: String,
  },
  methods: {
    async getLyric() {
      const { data: res } = await this.$axios.get("/lyric?id=" + this.id);

      const reg = /\[(.*?)](.*)/g;
      res.lrc.lyric.replace(reg, (a, b, c) => {
        const text = { time: b.substring(0, 5), lyric: c };
        // console.log(text);
        this.lyric.push(text);
      });
    },
  },
  watch: {
    time: {
      handler(v) {
        for (let i = 0; i < this.lyric.length; i++) {
          console.log(v, this.lyric[i].time);
          if (v === this.lyric[i].time) {
            this.lyricIndex = i;
            this.$refs.songBox.style.transition = "all 1s";
            if (i > 4) {
              this.$refs.songBox.scrollTo({
                top: 40 * (i - 5),
                behavior: "smooth",
              });
            }

            /*  this.$refs.songBox.style.transform = "translateY(-40px)";*/
          }
        }
      },
    },
  },
  created() {
    this.getLyric();
  },
};
</script>
<style lang="less" scoped>
.subContent {
  // background-color: rgb(76, 76, 76);
  ul::-webkit-scrollbar {
    display: none;
  }
  ul {
    margin: 60px auto 0;
    width: 80%;
    text-align: center;
    overflow: hidden; //超出的文本隐藏
    height: 380px;
    // text-overflow: clip; //溢出用省略号显示clip|ellipsis|string|initial|inherit;
    /* display: -webkit-box;
    -webkit-line-clamp: 9; // 超出多少行
    -webkit-box-orient: vertical; */

    li {
      list-style: none;
      line-height: 35px;
      color: rgb(178, 179, 177);
    }
    .active {
      font-size: 20px;
      color: rgb(245, 248, 242);
    }
  }
}
</style>
