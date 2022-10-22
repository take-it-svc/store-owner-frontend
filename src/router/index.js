import Vue from 'vue'
import VueRouter from 'vue-router'

import DashboardLayout from "@/views/Layout/DashboardLayout";
import AuthLayout from "@/views/Layout/AuthLayout";

import jwt from "../common/jwt.js";
import auth from "../api/authApi.js";

Vue.use(VueRouter)

const authCheck = async function (to, from, next) {
  try {
    if (jwt.isExpired()) {
      // token Refresh 요청
      await auth.requestReissue();
    } else {
      // access Token Check
      await auth.requestCheckAccessToken();
    }
  } catch (error) {
    // error -> /login 페이지로 route
    await router.replace("/login");
  }
  next();
};

const routes = [
  {
    path: '/login',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/views/LoginView.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('@/views/RegistrationView.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        beforeEnter: authCheck,
        component: () => import('@/views/DashBoardView.vue')
      },
      {
        path: '/category',
        name: 'category',
        beforeEnter: authCheck,
        component: () => import('@/views/CategoryView.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        beforeEnter: authCheck,
        component: () => import('@/views/MenuView.vue')
      },
      {
        path: '/prev-order',
        name: 'prev-order',
        beforeEnter: authCheck,
        component: () => import('@/views/PrevOrderView.vue')
      },
      {
        path: '/order',
        name: 'order',
        beforeEnter: authCheck,
        component: () => import('@/views/OrderView.vue')
      },
      {
        path: '/notification',
        name: 'notification',
        beforeEnter: authCheck,
        component: () => import('@/views/NotificationView.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
