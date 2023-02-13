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
 * 私有路由表
 */
const privateRoutes: Array<any> = [
  {
    path: "/user",
    component: () => import("@/views/layout/index.vue"),
    redirect: "/user/manage",
    meta: {
      title: "user",
      icon: "personnel",
      belongMenu: true,
    },
    children: [
      {
        path: "/user/manage",
        component: () => import("@/views/user-manage/index.vue"),
        meta: {
          title: "userManage",
          icon: "personal-manage",
          belongMenu: true,
        },
      },
      {
        path: "/user/role",
        component: () => import("@/views/role-list/index.vue"),
        meta: {
          title: "roleList",
          icon: "role",
          belongMenu: true,
        },
      },
      {
        path: "/user/permission",
        component: () => import("@/views/permission-list/index.vue"),
        meta: {
          title: "permissionList",
          icon: "permission",
          belongMenu: true,
        },
      },
      {
        path: "/user/info/:id",
        name: "userInfo",
        component: () => import("@/views/user-info/index.vue"),
        meta: {
          title: "userInfo",
        },
      },
      {
        path: "/user/import",
        name: "import",
        component: () => import("@/views/import/index.vue"),
        meta: {
          title: "excelImport",
        },
      },
    ],
  },
  {
    path: "/article",
    component: () => import("@/views/layout/index.vue"),
    redirect: "/article/ranking",
    meta: {
      title: "article",
      icon: "article",
      belongMenu: true,
    },
    children: [
      {
        path: "/article/ranking",
        component: () => import("@/views/article-ranking/index.vue"),
        meta: {
          title: "articleRanking",
          icon: "article-ranking",
          belongMenu: true,
        },
      },
      {
        path: "/article/:id",
        component: () => import("@/views/article-detail/index.vue"),
        meta: {
          title: "articleDetail",
        },
      },
      {
        path: "/article/create",
        component: () => import("@/views/article-create/index.vue"),
        meta: {
          title: "articleCreate",
          icon: "article-create",
          belongMenu: true,
        },
      },
      {
        path: "/article/editor/:id",
        component: () => import("@/views/article-create/index.vue"),
        meta: {
          title: "articleEditor",
        },
      },
    ],
  },
];

/**
 * 公开路由表
 */
const publicRoutes: Array<any> = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "login",
  },
  {
    path: "/",
    // 注意：带有路径“/”的记录中的组件“默认”是一个不返回 Promise 的函数
    component: () => import("@/views/layout/index.vue"),
    redirect: "/profile",
    meta: {
      belongMenu: true,
    },
    children: [
      {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/profile/index.vue"),
        meta: {
          title: "profile",
          icon: "profile",
          belongMenu: true,
        },
      },
      {
        path: "/404",
        name: "404",
        component: () => import("@/views/error-page/404.vue"),
      },
      {
        path: "/401",
        name: "401",
        component: () => import("@/views/error-page/401.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...publicRoutes, ...privateRoutes],
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
