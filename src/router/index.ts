import { createRouter, createWebHistory } from "vue-router";
import { routes } from "./routes";
import { useAuthStore } from "~/store/auth";

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, _from, next) => {
    const auth = useAuthStore()
  
    if (auth.token && (to.name === 'login')) {
      return next({ name: 'teachers' })
    }
  
    if (!auth.token && to.meta.requiresAuth) {
      return next({ name: 'login' })
    }
  
    next()
  })

export default router