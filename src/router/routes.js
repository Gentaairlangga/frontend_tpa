const routes = [
  {
    path: "/",
    redirect: {
      name: "halamanLogin",
    },
  },
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
    name: "halamanLogin",
  },
  {
    path: "/registrasi",
    component: () => import("pages/RegistrasiPage.vue"),
    name: "halamanRegistrasi",
  },
  {
    path: "/murid/",
    component: () => import("layouts/MuridLayout.vue"),
    meta: {
      murid: true,
    },
    children: [
      {
        path: "",
        name: "indexMurid",
        component: () => import("pages/murid/IndexMurid.vue"),
      },
      {
        path: "map",
        name: "mapsMurid",
        component: () => import("pages/murid/HalamanMap.vue"),
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("layouts/AdminLayout.vue"),
    meta: {
      admin: true,
    },
    children: [
      {
        path: "",
        name: "indexAdmin",
        component: () => import("pages/admin/IndexAdmin.vue"),
      },
      {
        path: "/tpa",
        name: "dataTpaAdmin",
        component: () => import("pages/admin/tpa/IndexTpa.vue"),
      },
      {
        path: "/tpa/input",
        name: "formInputTpa",
        component: () => import("pages/admin/tpa/formInput.vue"),
      },
      {
        path: "/tpa/edit/:id",
        name: "formEditTpa",
        component: () => import("pages/admin/tpa/editTpa.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
