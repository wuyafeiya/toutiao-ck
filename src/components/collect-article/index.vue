<template>
  <van-button
    :loading="loading"
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collected: value,
    }"
    @click="onCollect"
  ></van-button>
</template>

<script>
import { addCollect, deletCollect } from "../../api/article";
export default {
  name: "CollectArtile",
  data() {
    return {
      loading: false,
    };
  },
  props: {
    value: {
      type: Boolean,
      require: true,
    },
    articleId: {
      type: [Number, String, Object],
      require: true,
    },
  },
  methods: {
    async onCollect() {
      this.loading = true;
      try {
        if (!this.value) {
          await addCollect(this.articleId);
        } else {
          await deletCollect(this.articleId);
        }
        this.$emit("input", !this.value);
        this.$toast.success(!this.value ? "收藏成功" : "取消收藏");
      } catch (err) {
        console.log(err);
        let message = "请求失败";
        alert(message);
      }
      this.loading = false;
    },
  },
};
</script>

<style scpoed lang="less">
.collected {
  .van-icon {
    color: #ffa500;
  }
}
</style>