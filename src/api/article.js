import { transform } from 'lodash'
import request from '../utils/request'

export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/channels'
  })
}

export const addUserChannel = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

export const deleteUserChannel = channelId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/channels/${channelId}`
  })
}

export const getArticleById = articledId => {
  return request({
    method: 'GET',
    url: `/v1_0/articles/${articledId}`
  })
}

// 收藏

export const addCollect = target => {
  return request({
    method: "POST",
    url: "/v1_0/article/collections",
    data: {
      target
    }
  })
}


// 取消 收藏

export const deletCollect = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/article/collections/${target}`,
  })
}

// 点赞

export const addLiked = target => {
  return request({
    method: "POST",
    url: "/v1_0/article/likings",
    data: {
      target
    }
  })
}
// 取消点赞

export const deletLiked = target => {
  return request({
    method: "DELETE",
    url: `/v1_0/article/likings/${target}`
  })
}
