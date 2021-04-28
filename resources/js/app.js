require('./bootstrap');

window.Vue = require('vue').default;

const VueRouter = require('vue-router').default;
const Vuetify = require('vuetify');
require("vuetify/dist/vuetify.min.css");
require('material-design-icons-iconfont/dist/material-design-icons.css');

Vue.use(VueRouter);
Vue.use(Vuetify);

const Login = require('./components/LoginForm.vue');
const Home = require('./components/Home.vue');
const Billing = require('./components/Billing.vue');
const Clients = require('./components/Clients.vue');
const Config = require('./components/Configuration.vue');

const routes = [
    { path: '/', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/billing', component: Billing },
        { path: '/clients', component: Clients },
        { path: '/configuration', component: Config }
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

new Vue({
    router,
    vuetify: new Vuetify(),
    el: '#app',
});
