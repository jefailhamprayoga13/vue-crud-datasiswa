import { createRouter, createWebHistory } from "vue-router";
import Home from "../components/Home.vue";
import About from "../components/About.vue";
import LisData from "../components/ListData.vue";
import FormCreate from "../components/FormCreateData.vue";
import FormUpdate from "../components/FormUpdateData.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { title: "Home" },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: { title: "About" },
  },
  {
    path: "/siswa",
    name: "siswa",
    component: LisData,
    meta: { title: "Data Siswa" },
  },
  {
    path: "/siswa/create",
    name: "siswa.create",
    component: FormCreate,
    meta: { title: "Tambah Data Siswa" },
  },
  {
    path: "/:id/update",
    name: "siswa.update",
    component: FormUpdate,
    props: true,
    meta: { title: "Update Data Siswa" },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
