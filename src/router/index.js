import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 主页
    {
      path:'/',
      component:()=>import('../views/home.vue')
    }
  ]
})

export default router
