<template>
  <div class="header">
    <van-nav-bar left-arrow @click-left="goBack" @click-right="search">
      <template #title>
        <van-search
          v-model="keywords"
          shape="round"
          @keyup.esc="keywords = ''"
          @keyup.enter="search"
          placeholder="请输入搜索关键词"
          :style="{ padding: 0 }"
        />
      </template>
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: "MyHeader",
  data() {
    return {
      keywords: "",
    };
  },
  methods: {
    ...mapMutations(["setKeyword"]),
    goBack() {
      this.$router.go(-1);
    },
    search() {
      /* this.$router.push({
        name: "sea",
        params: { keywords: this.keyword },
      }); */
      this.$router.push("/searchResult/" + this.keywords);
    },
  },
  watch: {
    keywords: {
      handler(newValue) {
        this.setKeyword(newValue);
      },
    },
  },
  created() {
    this.keywords = this.$store.state.keyword;
  },
};
</script>
<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  --van-nav-bar-icon-color: "";
}
</style>
