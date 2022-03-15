<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <comment-item
      v-for="(comment, index) in list"
      :key="index"
      :comment="comment"
      @reply-click="$emit('reply-click', $event)"
    ></comment-item>
  </van-list>
</template>

<script>
import { getComment } from "@/api/comment.js";
import CommentItem from "./comment-item.vue";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  props: {
    source: {
      type: [Number, Object, String],
      require: true,
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CommentItem,
  },
  created() {
    this.onLoad();
  },
  methods: {
    async onLoad() {
      try {
        // 1.请求数据
        const { data } = await getComment({
          type: "a",
          source: this.source,
          offset: this.offset,
          limit: this.limit,
        });
        const { results } = data.data;
        this.list.push(...results);
        this.$emit("updata-success", data.data.total_count);
        this.loading = false;
        if (results.length) {
          this.offset = data.data.last_id;
        } else {
          this.finished = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
</style>