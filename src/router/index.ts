import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "@/components/layout/MainLayout.vue";

// 路由规则
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home/index.vue"), // 首页懒加载
      },
      // {
      //   path: "category/:type",
      //   name: "Category",
      //   component: () => import("@/views/Category/index.vue"), // 分类页
      //   props: true,
      // },
      {
        path: "case/:id",
        name: "CaseDetail",
        component: () => import("@/views/CaseDetail/index.vue"), // 案例详情页
        props: true,
      },
      // {
      //   path: "about",
      //   name: "About",
      //   component: () => import("@/views/About/index.vue"), // 关于页
      // },
    ],
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import("@/views/NotFound/index.vue"), // 404 页
  // },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 历史模式
  routes,
  scrollBehavior: () => ({ top: 0 }), // 路由切换滚动到顶部
});

export default router;
