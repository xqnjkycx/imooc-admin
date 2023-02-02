import { createRouter, createWebHashHistory } from "vue-router";

/**
 * 公开路由表
 */
const publicRoutes: Array<any> = [
  {
    path: "/",
    redirect: {
      name: "login",
    },
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: publicRoutes,
});

export default router;
