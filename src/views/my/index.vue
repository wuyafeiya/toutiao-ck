<template>
  <div>
    <div class="header" v-if="$store.state.user">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" :src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- 未登录 头部 -->
    <div class="header not-login" v-else @click="$router.push('/login')">
      <div class="login-btn">
        <img src="../../assets/mobile.png" class="login-img" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <van-grid :column-num="2" center border class="cell-group">
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link class="cell-group" />
    </van-cell-group>
    <van-cell
      title="退出登录"
      class="logout-cell"
      clickable
      @click="onLogout"
      v-if="$store.state.user"
    />
  </div>
</template>

<script>
import { getUserInfo } from '../../api/user'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    if (this.$store.state.user) {
      this.loadUser()
    }
  },
  methods: {
    onLogout () {
      this.$dialog
        .confirm({
          title: '确定要退出吗'
        })
        .then(() => {
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          console.log('取消执行这里')
        })
    },
    async loadUser () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="less">
.base-info {
  height: 115px;
  padding: 38px 16px 12px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
  }
  .avatar {
    width: 66px;
    height: 66px;
    border: 4px solid #fff;
    margin-right: 23px;
  }
  .name {
    font-size: 15px;
    color: #fff;
  }
}
.data-stats {
  display: flex;
  .data-item {
    height: 65px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    .count {
      font-size: 18px;
    }
    .text {
      font-size: 12px;
    }
  }
}
.header {
  height: 201px;
  background: url("../../assets/banner.png") no-repeat;
}
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  .login-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-img {
      width: 66px;
      height: 66px;
      margin-bottom: 10px;
    }
    .text {
      font-size: 15px;
      color: #fff;
    }
  }
}
.grid-item {
  height: 100px;
  i.toutiao {
    font-size: 23px;
  }
  .toutiao-shoucang {
    color: #eb5556;
  }
  .toutiao-lishi {
    color: #ff9d1d;
  }
  .text {
    font-size: 14px;
    margin-top: 5px;
  }
}
.logout-cell {
  text-align: center;
  color: #eb5556;
}
.cell-group {
  margin-bottom: 9px;
}
</style>
