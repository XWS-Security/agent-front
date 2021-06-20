<template>
  <div>
    <a class="nav-link" v-on:click="logOut">Log out</a>
  </div>
</template>

<script>
export default {
  name: "LogOutLink",

  methods: {
    logOut() {
      this.$store.dispatch('logOut');
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>

</style>
