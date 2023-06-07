import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import CustomerCourseView from '../views/CustomerCourseView.vue'
import CustomerCourseDetailView from '../views/CustomerCourseDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/customer-course',
      name: 'customer-course',
      component: CustomerCourseView
    },
    {
      path: '/customer-course/:id',
      name: 'customer-course-detail',
      component: CustomerCourseDetailView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    }
  ]
})

router.beforeEach((to, from, next) => {
  let authentication = localStorage.getItem('access_token')
  if (!authentication && to.name == 'customer-course') next('login')
  else if (authentication && (to.name == 'login' || to.name == 'register')) next('/')
  else next()
})

export default router
