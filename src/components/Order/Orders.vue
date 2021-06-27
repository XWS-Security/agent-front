<template>
  <ul class="list-group">
    <li class="list-group-item disabled" v-for="(order, index) in orders" v-bind:key="index">
      <order-details v-bind:order="order"></order-details>
    </li>
  </ul>
</template>

<script>
import OrderDetails from "@/components/Order/OrderDetails";

export default {
  name: "Orders",
  components: {OrderDetails},
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    this.$http
        .get(process.env.VUE_APP_BACKEND_URL + 'order/')
        .then(response => (this.orders = response.data))
        .catch(err => (alert(err.response.data)))
  }
}
</script>

<style scoped>

</style>