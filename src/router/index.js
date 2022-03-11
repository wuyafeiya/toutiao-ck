import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/index.vue')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('../views/article'),
    props: true
  },
  {
    path: '/',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/home/index.vue')
      },
      {
        path: 'qa',
        name: 'qa',
        component: () => import('../views/qa')

      },
      {
        path: 'video',
        name: 'video',
        component: () => import('../views/video')
      },
      {
        path: 'my',
        name: 'my',
        component: () => import('../views/my')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
