require('./bootstrap');

window.Vue = require('vue').default;
const VueRouter = require('vue-router').default;
const Vuetify = require('vuetify');
require('vuetify/dist/vuetify.min.css');

Vue.use(VueRouter);
Vue.use(Vuetify)

import Login from './components/LoginForm.vue'
import Home from './components/Home.vue'
import Billing from './components/Billing.vue'

const routes = [
    { path: '/', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: 'billing', component: Billing },
      ]
    },
  ]
  
  // eslint-disable-next-line no-new
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

Vue.component('App', require('./App.vue').default);

const app = new Vue({
    router,
    vuetify: new Vuetify(),
    el: '#app',
});
