<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="oninput" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "../../../api/comment";
console.log(addComment);
export default {
  name: "CommentPost",
  components: {},
  props: {
    target: {
      type: [Number, String, Object],
      require: true,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async oninput() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const { data } = await addComment({
          target: this.target,
          content: this.message,
          art_id: null,
        });
        console.log(data);
        this.message = "";
        this.$toast.success("发布成功");
        this.$emit("post-success", data.data);
      } catch (err) {
        console.dir(err);
        this.$toast.fail("发布失败");
      }
    },
  },
};
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 16px 0 16px 16px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 75px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>