<template>
  <li class="nav-item active">
    <router-link to="/cart">
      <a class="nav-link" href="#">
        <b-icon-cart-3></b-icon-cart-3>
      </a>
    </router-link>
  </li>
</template>

<script>
import {BIconCart3} from "bootstrap-vue";

export default {
  name: "CartLink",
  components: {BIconCart3}
}
</script>

<style scoped>

</style>