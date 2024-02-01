import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(process.env.VUE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
