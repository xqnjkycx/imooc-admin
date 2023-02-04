import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from "vue-router";

import { getItem } from "@/utils/tools/storage";
import { TOKEN } from "@/utils/tools/contrast";

const whiteRouteList = ["/login"];

/**
 * 公开路由表
 */
const publicRoutes: Array<any> = [
  {
    path: "/",
    component: () => import("@/views/layout/index.vue"),
    name: "layout",
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

/**
 * 路由守卫
 */
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalizedLoaded, next) => {
    if (getItem(TOKEN)) {
      if (to.path === "/login") {
        next("/");
      } else {
        next();
      }
    } else {
      if (whiteRouteList.includes(to.path)) {
        next();
      } else {
        next("/login");
      }
    }
  }
);

export default router;
