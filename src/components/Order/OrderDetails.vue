<template>
  <div class="row">
    <div class="col">
      <div class="d-flex flex-row flex-wrap align-content-center">
        <div class="p-2" v-for="(item, index) in order.items" v-bind:key="index">
          <order-item v-bind:orderItem="item"></order-item>
        </div>
      </div>
    </div>
    <div class="col mt-5 bg-light border border-light rounded align-self-start p-4">
      <h4>Personal data</h4>
      <h5>Name: {{ order.name }}</h5>
      <h5>Surname: {{ order.surname }}</h5>
      <h5>Phone number: {{ order.phoneNumber }}</h5>
      <h5>Email: {{ order.email }}</h5>
      <hr>
      <h4>Shipping address</h4>
      <h5>Country: {{ order.address.country }}</h5>
      <h5>City: {{ order.address.city }}</h5>
      <h5>Street: {{ order.address.street }}</h5>
      <h5>Zip code: {{ order.address.zipCode }}</h5>
    </div>
  </div>
</template>

<script>
import OrderItem from "@/components/Order/OrderItem";

export default {
  name: "OrderDetails",
  props: ['order'],
  components: {OrderItem},
  data() {
    return {}
  }
}
</script>

<style scoped>

</style>