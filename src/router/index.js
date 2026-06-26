import { createWebHistory, createRouter } from "vue-router";

import ContactBook from "../views/ContactBook.vue";
import ContactAdd from "../views/ContactAdd.vue";
import ContactEdit from "../views/ContactEdit.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/contacts/add",
    name: "contact.add",
    component: ContactAdd,
  },
  {
  path: "/contacts/:id",
  name: "contact.edit",
  component: ContactEdit,
  props: true,
},
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;