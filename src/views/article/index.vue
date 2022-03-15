<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="login-nav" left-arrow title="黑马头条">
      <van-icon slot="left" name="arrow-left" @click="$router.back()" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ article.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" />
          <div slot="title" class="user-name">{{ article.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ article.pubdate | relativeTime }}
          </div>
          <followUser
            class="follow-btn"
            v-model="article.is_followed"
            :userId="article.aut_id"
          ></followUser>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content"
          ref="article-content"
          v-html="article.content"
        ></div>
        <van-divider>正文结束</van-divider>
        <comment-list
          :source="article.art_id"
          @updata-success="totalcount = $event"
          :list="commentList"
          @reply-click="onReplyClick"
        ></comment-list>
        <van-popup
          v-model="isPostShow"
          position="bottom"
          round
          :style="{ height: '25%' }"
        >
          <comment-post
            :target="article.art_id"
            @post-success="onPostSuccess"
          ></comment-post>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :info="totalcount" color="#777" />
      <collectArticle
        v-model="article.is_collected"
        :articleId="article.art_id"
        class="btn-item"
      ></collectArticle>
      <likeArticle
        v-model="article.attitude"
        :likedId="article.art_id"
        class="btn-item"
      ></likeArticle>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      ></comment-reply>
    </van-popup>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById } from "../../api/article";
import { ImagePreview } from "vant";
import followUser from "../../components/follow-user";
import collectArticle from "../../components/collect-article";
import likeArticle from "../../components/like-article";
import CommentList from "./components/comment-list.vue";
import CommentPost from "./components/comment-post.vue";
import CommentReply from "./components/comment-reply.vue";
export default {
  name: "ArticleIndex",
  components: {
    followUser,
    collectArticle,
    likeArticle,
    CommentList,
    CommentPost,
    CommentReply,
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true,
    },
  },
  data() {
    return {
      article: {},
      loading: true,
      errStatus: 0,
      isFollowLoading: false,
      totalcount: "",
      isPostShow: false,
      isReplyShow: false,
      commentList: [],
      currentComment: {},
    };
  },
  computed: {},
  watch: {},
  created() {
    console.log(this);
    this.loadArticle();
  },
  mounted() {},
  methods: {
    async loadArticle() {
      this.loading = true;
      try {
        const { data } = await getArticleById(this.articleId);
        this.article = data.data;
        setTimeout(() => {
          this.previewImage();
        });
      } catch (err) {
        console.dir(err);
        if (err.response && err.response.status === 404) {
          this.errStatus = 404;
        } else {
          this.article = {};
        }
      }
      this.loading = false;
    },

    previewImage() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");

      const images = [];
      imgs.forEach((img, index) => {
        images.push(img.src);
        img.onclick = () => {
          ImagePreview({
            images,
            startPosition: index,
          });
        };
      });
    },
    onPostSuccess(data) {
      this.isPostShow = false;
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj);
    },
    onReplyClick(comment) {
      this.currentComment = comment;
      // 显示评论回复弹出层
      this.isReplyShow = true;
    },
  },
};
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 8px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 27px 16px;
      font-size: 12px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 1px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .btn-item {
      border: none;
    }
    .van-icon {
      font-size: 20px;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
}
</style>
