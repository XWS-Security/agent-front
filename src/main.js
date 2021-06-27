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
import ActivationSucceeded from "@/components/User/Registration/ActivationSucceeded";
import ActivationFailed from "@/components/User/Registration/ActivationFailed";
import Activation from "@/components/User/Registration/Activation";
import CreateProduct from "@/components/Product/CreateProduct";
import AllProducts from "@/components/Product/AllProducts";
import Product from "@/components/Product/Product";
import Shop from "@/components/Shop/Shop";
import ProductDetails from "@/components/Shop/ProductDetails";
import Cart from "@/components/Cart/Cart";
import Orders from "@/components/Order/Orders";

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(VueRouter);
Vue.prototype.$http = axios;

const routes = [{path: '/userRegistration', component: Registration},
    {path: '/login', component: Login},
    {path: '/activation/success', component: ActivationSucceeded},
    {path: '/activation/failed', component: ActivationFailed},
    {path: '/activation', component: Activation},
    {path: '/createProduct', component: CreateProduct},
    {path: '/allProducts', component: AllProducts},
    {path: '/product', component: Product},
    {path: '/shop', component: Shop},
    {path: '/details', component: ProductDetails},
    {path: '/cart', component: Cart},
    {path: '/orders', component: Orders}];

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
    store: store,
    render: h => h(App),
    router
}).$mount('#app')
