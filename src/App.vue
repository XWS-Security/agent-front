<template>
  <div id="app">
    <NavBar>
      <NavGroup side='mr-auto'>
        <RegistrationLink v-if="user == null"></RegistrationLink>
        <LoginLink v-if="user == null"></LoginLink>
        <LogOutLink v-if="user !== null"></LogOutLink>
      </NavGroup>
    </NavBar>
    <h3>{{ user }}</h3>
    <router-view></router-view>
  </div>
</template>

<script>

import NavGroup from "@/components/NavBar/NavGroup";
import NavBar from './components/NavBar/NavBar.vue'
import RegistrationLink from "@/components/NavBar/RegistrationLink";
import LoginLink from "@/components/NavBar/LoginLink";
import LogOutLink from "@/components/NavBar/LogOutLink";
export default {
  name: 'App',
  components: {
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
