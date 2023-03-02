import { createRouter, createWebHistory } from "vue-router";
import PrimeLogin from "../pages/PrimeLogin.vue";
import TodoVue from "../pages/Todo.vue";
import Users from "@/pages/Users.vue";
import Homepage from '../pages/Home.vue'


const routes = [
  {
    path: "/",
    name: "Home",
    component: Homepage,
  },
  {
    path: "/todos",
    name: "TodoVue",
    component: TodoVue,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/login",
    name: "PrimeLogin",
    component: PrimeLogin,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: "active",
});
router.beforeEach((to, from, next) => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (to.name !== "PrimeLogin" && !token) {
    next({ name: "PrimeLogin" });
  }
  if (to.name === "PrimeLogin" && token) {
    next({ name: "TodoVue" });
  } else next();
});
export default router;
