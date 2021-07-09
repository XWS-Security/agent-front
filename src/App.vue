<template>
  <div id="app">
    <NavBar>
      <NavGroup side='mr-auto'>
        <RegistrationLink v-if="user == null"></RegistrationLink>
        <LoginLink v-if="user == null"></LoginLink>
        <LogOutLink v-if="user !== null"></LogOutLink>
        <CreateProductLink v-if="user == 'Agent'"></CreateProductLink>
        <AllProductsLink v-if="user == 'Agent'"></AllProductsLink>
        <OrdersLink v-if="user == 'Agent'"></OrdersLink>
        <GenerateReportLink v-if="user == 'Agent'"></GenerateReportLink>
      </NavGroup>
      <NavGroup side="ml-auto">
        <CartLink></CartLink>
      </NavGroup>
    </NavBar>
    <router-view></router-view>
  </div>
</template>

<script>

import NavGroup from "@/components/NavBar/NavGroup";
import NavBar from './components/NavBar/NavBar.vue'
import RegistrationLink from "@/components/NavBar/RegistrationLink";
import LoginLink from "@/components/NavBar/LoginLink";
import LogOutLink from "@/components/NavBar/LogOutLink";
import CreateProductLink from "@/components/NavBar/CreateProductLink";
import AllProductsLink from "@/components/NavBar/AllProductsLink";
import CartLink from "@/components/NavBar/CartLink";
import OrdersLink from "@/components/NavBar/OrdersLink";
import GenerateReportLink from "@/components/NavBar/GenerateReportLink";

export default {
  name: 'App',
  components: {
    GenerateReportLink,
    OrdersLink,
    CartLink,
    AllProductsLink,
    CreateProductLink,
    LogOutLink,
    LoginLink,
    RegistrationLink, NavBar, NavGroup
  },
  created() {
    this.$store.dispatch('startSession', null);
    this.$http.defaults.headers.common['Authorization'] = this.$store.getters.tokenString;
  },
  watch: {
    $route() {
      this.$http.defaults.headers.common['Authorization'] = this.$store.getters.tokenString;
    }
  },
  computed: {
    user() {
      let user = this.$store.state.userType;
      return user;
    },
  }
  ,
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
