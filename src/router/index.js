import { route } from "quasar/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { LocalStorage } from "quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(
      process.env.MODE === "ssr" ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  Router.beforeEach((to, from, next) => {
    const user = LocalStorage.getItem("user");
    const noSession = user === null || user === "undefined";

    if (to.meta.murid) {
      if (noSession) {
        next({
          name: "halamanLogin",
        });
      } else {
        if (user.level === 2) {
          next();
        } else {
          next({
            name: "halamanLogin",
          });
        }
      }
    } else if (to.meta.admin) {
      if (noSession) {
        next({
          name: "halamanLogin",
        });
      } else {
        if (user.level === 1) {
          next();
        } else {
          next({
            name: "halamanLogin",
          });
        }
      }
    } else {
      if (noSession) {
        next();
      } else {
        if (user.level === 2) {
          next({
            name: "indexMurid",
          });
        } else {
          next({
            name: "indexAdmin",
          });
        }
      }
    }
  });

  return Router;
});
