import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"
import VueCardPayment from 'vue-card-payment'
import axios from 'axios';
import Vuex from "vuex"
import generalStore from './generalStore';
import Loading from './components/loading';
import Header from "./components/header.vue"

import "./assets/styles.scss"
import vuetify from './plugins/vuetify'

const url = process.env.NODE_ENV == "production"? window.location.origin: "http://localhost:3000";
axios.defaults.baseURL = url;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.moment = require('moment');


Vue.use(VueCardPayment);
Vue.component("loading", Loading);

Vue.filter("category", number => {
  return store.getters.categories.find(cat => cat.number == number).name;
})

Vue.use(VueRouter);
const routes = [
  {path: "/", components: {default: () => import("./pages/main-page.vue")}},
  {path: "/payment", components: {default : () => import("./pages/payment.vue"), 'header': Header}},
  {path: "/login", component: () => import("./pages/login.vue")},
  {path: "/editAdminData", component: () => import("./pages/login.vue")},
  {path: "/complete/:id", components: {default: () => import("./pages/complete.vue"), 'header': Header}},
  {path: "/system-details/:id", components: {default: () => import("./pages/system-details.vue"), 'header': Header}},
  
  
  {path: "/dashboard", component: () => import("./pages/admin/dashboard"), children: [
    {path: "", component: () => import("./pages/admin/main-panel.vue")},
    {path: "site-data", component: () => import("./pages/admin/site-data.vue")},
    {path: "transactions", component: () => import("./pages/admin/transactions.vue")},
    {path: "add-system", component: () => import("./pages/admin/add-edit-system.vue")},
    {path: "edit-system/:id", component: () => import("./pages/admin/add-edit-system.vue")},
    {path: "systems", component: () => import("./pages/admin/systems.vue")},
    {path: "categories", component: () => import("./pages/admin/categories.vue")},
  ],
  beforeEnter (to, from, next) {
    if(localStorage.getItem("token")) {
      next();
    } else {
      next("/login");
    }
  }
  },
];

export const router = new VueRouter({
  mode: "history",
  base: "./",
  routes
})

Vue.use(Vuex);
const store = new Vuex.Store({modules: {
  generalStore
}});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
