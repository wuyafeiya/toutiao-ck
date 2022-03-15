<template>
  <van-button
    :icon="value == 1 ? 'good-job' : 'good-job-o'"
    :class="{ liked: value == 1 }"
    @click="liked"
  />
</template>

<script>
import { addLiked, deletLiked } from "@/api/article";
export default {
  props: {
    value: {
      type: Number,
      require: true,
    },
    likedId: {
      type: [Number, String, Object],
      require: true,
    },
  },
  methods: {
    async liked() {
      let status = -1;
      try {
        if (this.value === 1) {
          await deletLiked(this.likedId);
        } else {
          await addLiked(this.likedId);
          status = 1;
        }
        this.$emit("input", status);
        this.$toast.success(status == 1 ? "点赞成功" : "取消点赞");
      } catch (err) {
        alert(err.message);
      }
    },
  },
};
</script>

<style scpoed lang="less">
.liked {
  .van-icon {
    color: red;
  }
}
</style>