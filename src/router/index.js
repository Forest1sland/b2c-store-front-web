import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页
    {
      path: '/',
      component: () => import('../views/home.vue')
    },
    //全部类别
    {
      name: 'all',
      path: '/category',
      component: () => import('../views/category.vue')
    },
    //单独类别
    {
      name: 'category',
      path: '/category/:categoryName',
      component: () => import('../views/category.vue')
    },
    //商品详情
    {
      name: 'detail',
      path: '/detail/:productId',
      component: () => import('../views/detail.vue')
    },
    {
      name: 'order',
      path: '/order',
      component: () => import('../views/order.vue')
    },
    {
      name: 'collect',
      path: '/collect',
      component: () => import('../views/collect.vue')
    },
    {
      name: 'cart',
      path: '/cart',
      component: () => import('../views/cart.vue')
    }
  ]
})


router.beforeEach((to, from, next) => {

  if (from.name == 'category' || from.name == 'all') {
    window.location = to.path
  } else next()
})
export default router
