<template>
  <van-button
    v-if="value"
    round
    :loading="loading"
    size="small"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    type="info"
    color="#3296fa"
    round
    :loading="loading"
    size="small"
    icon="plus"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from "@/api/user";
export default {
  //   model: {
  //     prop: isfollowed,
  //     event: "updata-is_followed",
  //   },
  props: {
    value: {
      type: Boolean,
      require: true,
    },
    userId: {
      type: [Number, String, Object],
      require: true,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async onFollow() {
      this.loading = true;
      try {
        if (this.value) {
          await deleteFollow(this.userId);
        } else {
          await addFollow(this.userId);
        }
        // this.value = !this.value;
        this.$emit("input", !this.value);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          this.$toast.fail("操作失败");
        }
      }
      this.loading = false;
    },
  },
};
</script>

<style>
</style>