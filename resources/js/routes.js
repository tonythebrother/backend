window.Vue = require('vue').default;

const VueRouter = require('vue-router').default;

Vue.use(VueRouter);

import Login from './components/LoginForm.vue';
import Home from './components/Home.vue';
import Billing from './components/Billing.vue';
import Clients from './components/Clients.vue';
import Config from './components/Configuration.vue';

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
 
export default router;