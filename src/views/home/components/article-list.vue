<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '../../../api/article'
import ArticleItem from '../../../components/article-item'
export default {
  props: {
    channel: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      timestamp: null,
      refreshing: false,
      refreshSuccessText: ''
    }
  },
  components: {
    ArticleItem
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.timestamp = data.data.pre_timestammp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        this.loading = false
        this.error = true
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        this.list.push(...results)
        this.refreshing = false
        this.refreshSuccessText = `刷新成功,更新了${results.length}条数据`
      } catch (err) {
        console.log(err)
        this.refreshing = false
        this.$toast('刷新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
// .article-list {
//   position: fixed;
//   top: 180px;
//   bottom: 100px;
//   right: 0;
//   left: 0;
//   overflow-y: auto;
// }
</style>
