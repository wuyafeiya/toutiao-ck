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
