import Vue from 'vue'
import App from './App.vue'

import {BootstrapVue} from 'bootstrap-vue'
import VueRouter from 'vue-router'
import axios from 'axios';
import {store} from './store/store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Registration from "@/components/User/Registration/Registration";
import Login from "@/components/User/Login/Login";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.prototype.$http = axios;

const routes = [{path: '/userRegistration', component: Registration},
    {path: '/login', component: Login},];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    store: store,
    render: h => h(App),
    router
}).$mount('#app')