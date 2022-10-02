<template>
  <div class="list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div style="overflow: hidden">
        <van-cell
          v-for="item in list"
          :key="item"
          @click="toPlayListDetail(item.id)"
          :style="{
            width: '33.3%',
            height: '150px',
            float: 'left',
            padding: '2px',
          }"
        >
          <template #default>
            <van-image radius="15px" class="playImg" :src="item.coverImgUrl" />
            <span class="recommended-text">{{ item.name }}</span>
          </template>
        </van-cell>
      </div>
    </van-list>
  </div>
</template>
<script>
export default {
  name: "MyPlaySquareList",
  data() {
    return {
      list: [],
      finished: false,
      loading: false,
    };
  },
  props: {
    cat: String,
  },
  methods: {
    toPlayListDetail(id) {
      this.$router.push({ name: "pld", params: { id: id } });
    },
    async getList() {
      let before = 0;
      if (this.list.length > 0) {
        before = this.list[this.list.length - 1].updateTime;
      }

      const { data: res } = await this.$axios.get(
        "/top/playlist/highquality?cat=" +
          this.cat +
          "&before=" +
          before +
          "&limit=21"
      );
      return res.playlists;
    },
    async onLoad() {
      // this.loading = true;
      const result = await this.getList();

      if (this.list.length == 0) {
        this.list = result;
      } else {
        this.list.push.apply(this.list, result);
      }
      this.loading = false;
      if (result.length == 0) {
        this.finished = true;
      }
    },
  },
  async created() {
    const result = await this.getList();
    this.list = result;
  },
};
</script>
<style lang="less" scoped>
.list {
  /* 父级添加flex属性 */
  display: flex;
  /* 默认根据x轴 row排列，y轴 column */
  flex-direction: row;
  /* 设置主轴上子元素排列方式 flex-end(从尾部开始排列)，center(主轴居中对齐)，space-around(平分剩余空间)，space-between(先两边贴边在平分剩余空间) */
  justify-content: center;
  /* flex布局中默认子元素不换行，若装不开将缩小子元素 flex-wrap: wrap(换行)，nowrap(不换行)*/
  flex-wrap: wrap;
  /* （单行使用）侧轴居中 stretch(拉伸)*/
  align-items: center;
  /* 有了换行，（多行使用）设置侧轴元素居中align-content: space-between */
  // align-content: space-around;
  width: 100%;
  margin: 30px auto 0;
  height: 450px;
  overflow: scroll;
  span {
    display: block;
    width: 100%;
    font-size: 15px;
    height: 34px;
    line-height: 17px;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    display: -webkit-box;
    -webkit-line-clamp: 2; // 超出多少行
    -webkit-box-orient: vertical;
  }
  .playImg {
    width: 100%;
    height: 100px;
  }
}
</style>
