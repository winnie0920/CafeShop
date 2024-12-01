import { userFormStore } from "@/stores/formStore";
import { createRouter, createWebHashHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    children: [
      {
        path: "login",
        name: "LoginView",
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
        children: [
          {
            path: "checkout",
            name: "UserCheckout",
            component: () => import("@/views/user/UserCheckout.vue"),
          },
        ],
      },
      {
        path: "about",
        name: "UserAbout",
        meta: { icon: "Side-Bookmark", title: "關於" },
        component: () => import("@/views/user/UserAbout.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "AdminLayout",
    redirect: { name: "AdminMeal" },
    component: () => import("@/layout/admin/AdminLayout.vue"),
    children: [
      {
        path: "meal",
        name: "AdminMeal",
        component: () => import("@/views/admin/AdminMeal.vue"),
        children: [
          {
            path: ":checkoutId",
            name: "AdminMealDetail",
            component: () => import("@/views/admin/AdminMealDetail.vue"),
          },
        ],
      },
      {
        path: "theme",
        name: "AdminTheme",
        component: () => import("@/views/admin/AdminTheme.vue"),
      },
      {
        path: "alter",
        name: "AdminAlter",
        component: () => import("@/views/admin/AdminAlter.vue"),
      },
      {
        path: "menu",
        name: "AdminMenu",
        component: () => import("@/views/admin/AdminMenu.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const tokenStore = useTokenStore();
  const formStore = userFormStore();
  if (to.path.startsWith("/admin")) {
    if (!tokenStore.verifyToken()) {
      return next({ name: "LoginView" });
    }
  }
  formStore.clearState();
  next();
});

export default router;
