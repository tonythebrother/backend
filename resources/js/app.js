require('./bootstrap');

window.Vue = require('vue').default;
const Vuetify = require('vuetify');
Vue.use(Vuetify);

Vue.component('Welcome', require('./components/Welcome/Welcome.vue').default);

require('vuetify/dist/vuetify.min.css');

const app = new Vue({
    vuetify: new Vuetify(),
    el: '#app',
});
