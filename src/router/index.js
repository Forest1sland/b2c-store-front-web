import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页
    {
      path: '/',
      meta: {
        title: '主页'
      },
      component: () => import('../views/home.vue')
    },
    //全部类别
    {
      name: 'all',
      path: '/category',
      meta: {
        title: '全部类别'
      },
      component: () => import('../views/category.vue')
    },
    //单独类别
    {
      name: 'category',
      path: '/category/:categoryName',
      meta: {
        title: '类别'
      },
      component: () => import('../views/category.vue')
    },
    //商品详情
    {
      name: 'detail',
      path: '/detail/:productId',
      meta: {
        title: '商品详情'
      },
      component: () => import('../views/detail.vue')
    },
    //订单
    {
      name: 'order',
      path: '/order',
      meta: {
        title: '订单'
      },
      component: () => import('../views/order.vue')
    },
    //收藏
    {
      name: 'collect',
      path: '/collect',
      meta: {
        title: '收藏'
      },
      component: () => import('../views/collect.vue')
    },
    //购物车
    {
      name: 'cart',
      path: '/cart',
      meta: {
        title: '购物车'
      },
      component: () => import('../views/cart.vue')
    },
    {
      name: 'confirmOrder',
      path: '/confirmOrder',
      meta: {
        title: '主页'
      },
      component: () => import('../views/confirmOrder.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if (from.name == 'category' || from.name == 'all') {
    window.location = to.path
  } else next()
})


export default router
