require('./bootstrap');

import Vue from 'vue'
import vuetify from './vuetify.js';
import router from './routes.js';

Vue.component('App', require('./App.vue').default);

new Vue({
    router,
    vuetify,
    el: '#app',
});
