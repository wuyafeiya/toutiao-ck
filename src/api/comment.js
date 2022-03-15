// 获取评论 列表
import request from "../utils/request";

export const getComment = (params) => {
    return request({
        method: "GET",
        url: "/v1_0/comments",
        params
    })
}


// 点赞

export const addCommentLiked = target => {
    return request({
        method: "POST",
        url: "/v1_0/comment/likings",
        data: {
            target
        }
    })
}

// 取消点赞

export const deletCommentLiked = target => {
    return request({
        method: "DELETE",
        url: `/v1_0/comment/likings/${target}`
    })
}


// 评论

export const addComment = data => {
    return request({
        method: "POST",
        url: "/v1_0/comments",
        data
    })
}