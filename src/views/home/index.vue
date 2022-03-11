<template>
  <div>
    <van-nav-bar class="login-nav">
      <van-button
        round
        slot="title"
        type="info"
        size="small"
        icon="search"
        class="search-btn"
        @click="searchBtn"
        >搜索</van-button
      >
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable sticky>
      <van-tab
        :title="item.name"
        v-for="(item, index) in channels"
        :key="index"
      >
        <articleList :channel="item"></articleList>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="closeBtn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '96%' }"
      closeable
      round
      close-icon-position="top-left"
    >
      <channelEdit :myChannels="channels" :active="active"></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '../../api/user'
import articleList from './components/article-list.vue'
import channelEdit from './components/channel-edit.vue'
export default {
  data () {
    return {
      active: 0,
      channels: [],
      show: false
    }
  },
  components: {
    articleList,
    channelEdit
  },
  created () {
    this.loadChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannels()
        // console.log(data);
        this.channels = data.data.channels
      } catch (err) {
        console.log(err)
      }
    },
    closeBtn () {
      this.show = true
    },
    searchBtn () {
      this.$router.push('/search')
    }
  }
}
</script>

<style scoped lang="less">
/deep/.van-nav-bar__title {
  max-width: unset;
}
.search-btn {
  width: 278px;
  height: 32px;
  // background-color: #5babfb;
  border: none;
  font-size: 14px;
  color: #fff;
  .van-icon {
    font-size: 16px;
    color: #fff;
  }
}
.placeholder {
  flex-shrink: 0;
  width: 33px;
  height: 41px;
}
.hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  height: 41px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 17px;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 1px;
    height: 100%;
    background-image: url(~@/assets/gradient-gray-line.png);
    background-size: contain;
  }

  .active {
    color: #e5615b;
    font-weight: 700;
  }
}
</style>
