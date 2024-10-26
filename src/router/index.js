import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    children: [
      {
        path: "login",
        name: "Login",
        component: () => import("@/views/LoginView.vue"),
      },
    ],
  },
  {
    path: "/",
    redirect: { name: "UserHome" },
    component: () => import("@/layout/user/UserLayout.vue"),
    children: [
      {
        path: "home",
        name: "UserHome",
        meta: { icon: "Side-Bookmark", title: "點餐首頁" },
        component: () => import("@/views/user/UserHome.vue"),
      },
      {
        path: "about",
        name: "UserAbout",
        meta: { icon: "Side-Bookmark", title: "關於" },
        component: () => import("@/views/user/UserAbout.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
